import { describe, it, expect } from 'vitest'
import { getAPIKey } from '../api/auth'
import { IncomingHttpHeaders } from 'http'

describe('getAPIKey', () => {
    it('should return null when no authorization header is present', () => {
        const headers: IncomingHttpHeaders = {}
        expect(getAPIKey(headers)).toBeNull()
    })

    it('should return null when authorization header has incorrect format', () => {
        const headers: IncomingHttpHeaders = {
            authorization: 'Bearer token123'
        }
        expect(getAPIKey(headers)).toBeNull()
    })

    it('should return null when authorization header is missing token', () => {
        const headers: IncomingHttpHeaders = {
            authorization: 'ApiKey'
        }
        expect(getAPIKey(headers)).toBeNull()
    })

    it('should return API key when authorization header is valid', () => {
        const expectedKey = 'test-api-key-123'
        const headers: IncomingHttpHeaders = {
            authorization: `ApiKey ${expectedKey}`
        }
        expect(getAPIKey(headers)).toBe(expectedKey)
    })
}) 