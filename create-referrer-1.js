/**
 * Set referrer in sessionStorage for next page view
 * Scope       : After Tags
 * Occurrence  : Run Always
 * Condition   : ut.event equals (ignore case) view
 * Description : Set referrer to be picked up as dom.referrer on the next page view
 **/
 
sessionStorage.setItem('referrer', document.location.href);
