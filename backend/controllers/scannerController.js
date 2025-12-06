const asyncHandler = require('../middleware/asyncHandler');
const axios = require('axios');
const https = require('https');

// @desc    Scan URL for vulnerabilities
// @route   POST /api/scanner
// @access  Private
const scanUrl = asyncHandler(async (req, res) => {
    const { url } = req.body;

    if (!url) {
        res.status(400);
        throw new Error('URL is required');
    }

    console.log(`Scanning URL: ${url}`); // LOGGING

    let targetUrl = url;
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'http://' + targetUrl;
    }

    const checks = [];
    let score = 100;

    try {
        const startTime = Date.now();
        const response = await axios.get(targetUrl, {
            validateStatus: () => true, // resolve even if 404/500
            timeout: 10000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Allow scanning self-signed for analysis
        });
        const latency = Date.now() - startTime;

        // 1. SSL/TLS Check
        if (targetUrl.startsWith('https')) {
            checks.push({
                id: 'ssl',
                name: 'SSL/TLS Encryption',
                status: 'pass',
                message: 'Connection is encrypted (HTTPS)',
                severity: 'low'
            });
        } else {
            checks.push({
                id: 'ssl',
                name: 'SSL/TLS Encryption',
                status: 'fail',
                message: 'Site is not using HTTPS. Data is transmitted in cleartext.',
                severity: 'high'
            });
            score -= 40;
        }

        const headers = response.headers;

        // 2. X-Frame-Options
        if (headers['x-frame-options']) {
            checks.push({ id: 'xfo', name: 'X-Frame-Options', status: 'pass', message: 'Header present', severity: 'low' });
        } else {
            checks.push({ id: 'xfo', name: 'X-Frame-Options', status: 'warn', message: 'Missing X-Frame-Options header (Clickjacking risk)', severity: 'medium' });
            score -= 10;
        }

        // 3. Content-Security-Policy
        if (headers['content-security-policy']) {
            checks.push({ id: 'csp', name: 'Content-Security-Policy', status: 'pass', message: 'Header present', severity: 'low' });
        } else {
            checks.push({ id: 'csp', name: 'Content-Security-Policy', status: 'warn', message: 'Missing CSP header (XSS risk)', severity: 'medium' });
            score -= 10;
        }

        // 4. Strict-Transport-Security
        if (headers['strict-transport-security']) {
            checks.push({ id: 'hsts', name: 'HSTS', status: 'pass', message: 'HSTS Enabled', severity: 'low' });
        } else if (targetUrl.startsWith('https')) {
            checks.push({ id: 'hsts', name: 'HSTS', status: 'warn', message: 'Missing HSTS header', severity: 'medium' });
            score -= 5;
        }

        // 5. Server Leakage
        if (headers['server'] || headers['x-powered-by']) {
            checks.push({
                id: 'server_leak',
                name: 'Server Information',
                status: 'warn',
                message: `Server version exposed: ${headers['server'] || headers['x-powered-by']}`,
                severity: 'low'
            });
            score -= 5;
        } else {
            checks.push({ id: 'server_leak', name: 'Server Information', status: 'pass', message: 'Server headers hidden', severity: 'low' });
        }

        res.json({
            url: targetUrl,
            params: {
                status: response.status,
                latency: `${latency}ms`
            },
            checks,
            score: Math.max(0, score)
        });

    } catch (error) {
        res.json({
            url: targetUrl,
            error: error.message,
            checks: [
                { id: 'connection', name: 'Reachability', status: 'fail', message: `Could not connect: ${error.message}`, severity: 'critical' }
            ],
            score: 0
        });
    }
});

module.exports = { scanUrl };
