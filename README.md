# tealium-spa-pageview
Code for tracking Single Page App page views within Tealium iQ

## Quick guide for use
1. Add in the Tealium Built-In Data data layer bundle, if not already added
2. Add `pageview.js` as a Javascript Code / Advanced Javascript Code extension, scoped to Pre Loader
3. Update the `tealTrack()` function as follows:
   - Work out a RegEx that identifies page templates from the URL
   - Work out the last element that loads as part of that route change

Example:
- URL is https://www.example.com/product/linen-blazer.html
- HTML injected into the page looks something like the following:
```
<div>
  <div class="title">
    <h1>Doggo Ipsum</h1>
  </div>
  <div class="body">
    <p>Doggo ipsum shoob very taste wow shibe many pats, super chub stop it fren ur givin me a spook very jealous pupper, aqua doggo such treat.</p>
  </div>
  <div class="footer">
    <p>From https://doggoipsum.com/</p>
  </div>
</div>
```
From the URL, you can see "/product/" is the pattern that identifies a product page - and from the HTML, you can see that the div with the "footer" class is the last element that loads. Thus, to trigger a page view event with tealium_event = product_view:
```
if (/\/product\//.test(url)) {
  tealPageView('.footer', 'product_view');
}
```
Add in `else if` statements for each page template you want to track. Leave the final `else` statement as is (this is the fallback so at least something gets tracked). You can also add in `else if` statements with no corresponding `tealPageView()` function call to skip tracking calls for that URL pattern.

4. If you want to use parts of the URL in the Data Layer, add `pathname-tokeniser.js` as a Javascript Code / Advanced Javascript Code extension, scoped to Before Load Rules. You need to add `_pathname1`, `_pathname2` etc. to your Data Layer tab (and documentation!) as well.
5. If you want to configure web analytics for the app, using the standard Javascript `document.referrer` or Tealium `dom.referrer` won't work. The following technique relies on having at least one tag fire at all times, preferably one that is exempt from consent requirements.
   1. Add `create-referrer-1.js` as a Javascript Code / Advanced Javascript Code extension, scoped to After Tags.
   2. Add `create-referrer-2.js` as a Javascript Code / Advanced Javascript Code extension, scoped to Before Load Rules.
   3. Update any web analytics / social tags to override any automatic mapping for URL and referrer with `dom.url` and `dom.referrer` respectively. You probably also want to override the automatic mapping for document title as well.
