import {
    formatDate
  } from './utils';

  describe('format date string to yyyy-mm-dd format', () => {
    it('Should return 2020-01-06', () => {
      const dateString = '2020-01-06T00:00:00+00:00';
      const expectedResult = '2020-01-06';
      expect(formatDate(dateString)).toBe(expectedResult);
    });

    it('Should return Invalid date', () => {
        const dateString = '';
        const expectedResult = 'Invalid date';
        expect(formatDate(dateString)).toBe(expectedResult);
      });
    
  });