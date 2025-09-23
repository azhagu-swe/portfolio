import { isBot } from '../VisitorContext';

describe('VisitorContext utilities', () => {
  describe('isBot', () => {
    it('should return true for known bot user agents', () => {
      const botUserAgents = [
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
        'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',
        'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
        'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)'
      ];
      
      botUserAgents.forEach(userAgent => {
        expect(isBot(userAgent)).toBe(true);
      });
    });

    it('should return false for regular browser user agents', () => {
      const browserUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      ];
      
      browserUserAgents.forEach(userAgent => {
        expect(isBot(userAgent)).toBe(false);
      });
    });

    it('should be case insensitive', () => {
      const userAgent = 'Mozilla/5.0 (compatible; GOOGLEBOT/2.1; +http://www.google.com/bot.html)';
      expect(isBot(userAgent)).toBe(true);
    });
  });
});