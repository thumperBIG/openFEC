import os
import json
import logging

import mandrill

logger = logging.getLogger(__name__)

class CaptureLogs:

    def __init__(self, logger, buffer):
        self.logger = logger
        self.buffer = buffer

    def __enter__(self):
        self.formatter = logging.Formatter(
            fmt='%(asctime)s %(levelname)s:%(name)s:%(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
        )
        self.handler = logging.StreamHandler(self.buffer)
        self.handler.setFormatter(self.formatter)
        self.logger.addHandler(self.handler)

    def __exit__(self, exc_type, exc_value, exc_tb):
        if exc_value is not None:
            self.logger.exception(exc_value)
        self.logger.removeHandler(self.handler)

def send_mail(buffer):
    client = mandrill.Mandrill(os.getenv('MANDRILL_API_KEY'))
    settings = json.loads(os.getenv('VCAP_APPLICATION', '{}'))
    message = {
        'text': buffer.getvalue(),
        'from_email': os.getenv('FEC_EMAIL_SENDER'),
        'subject': 'FEC Update: {space}|{app}'.format(
            space=settings.get('space-name', 'unknown-space'),
            app=settings.get('name', 'unknown-app'),
        ),
        'to': [
            {'email': each}
            for each in os.getenv('FEC_EMAIL_RECIPIENTS').split(',')
        ],
    }
    client.messages.send(message=message, async=False)
