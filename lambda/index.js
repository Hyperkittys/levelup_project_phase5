const https = require('https');
const url = require('url');

exports.handler = async (event) => {
    const message = JSON.parse(event.Records[0].Sns.Message);
    const slackMessage = {
        text: `Alarm: ${message.AlarmName}\nDetail: ${message.NewStateValue} - ${message.NewStateReason}`
    };

    const slackUrl = new URL(process.env.SLACK_WEBHOOK_URL);

    const options = {
        hostname: slackUrl.hostname,
        path: slackUrl.pathname + slackUrl.search,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let response = '';
            res.on('data', (d) => {
                response += d;
            });
            res.on('end', () => {
                console.log(`Slack response: ${response}`);
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Error sending to Slack: ${e}`);
            reject(e);
        });

        req.write(JSON.stringify(slackMessage));
        req.end();
    });
}; 