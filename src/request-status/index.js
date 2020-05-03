import createRequestStatus from './request-status';
import got from 'got';

const requestStatus = createRequestStatus({ httpClient: got });

export default requestStatus;
