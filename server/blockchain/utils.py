import logging

LOG_DIR = './log'


def get_logger(level=None):
    logger = logging.getLogger('analysis')

    if level is not None:
        logger.handlers = []
        logger.setLevel(logging.DEBUG)
        logger.propagate = 0 # Prevent logging from propagating to the root logger

        # Console handler
        cformat = logging.Formatter('%(levelname)s: %(message)s')
        ch = logging.StreamHandler()
        ch.setFormatter(cformat)
        ch.setLevel(level)
        logger.addHandler(ch)

        # File handler
        fformat = logging.Formatter('%(asctime)s: %(levelname)s: %(message)s', datefmt='%H:%M:%S')
        fh = logging.FileHandler(f'{LOG_DIR}/output.log', 'w+')
        fh.setFormatter(fformat)
        fh.setLevel(logging.INFO)
        logger.addHandler(fh)

    return logger
