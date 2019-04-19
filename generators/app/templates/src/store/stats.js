import * as fetcher from '../fetchers/stats'

export function getHealth() {
	return fetcher.getHealth();
}

export function getAudits() {
	return fetcher.getAudits();
}