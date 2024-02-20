/**
 * Get referrer from sessionStorage for current page view
 * Scope       : Before Load Rules
 * Occurrence  : Run Always
 * Condition   : ut.event equals (ignore case) view
 * Description : Create dom.referrer from referrer in sessionStorage
 */

if (sessionStorage.getItem('referrer')) {
  b['dom.referrer'] = sessionStorage.getItem('referrer');
} else {
  b['dom.referrer'] = '';
}
