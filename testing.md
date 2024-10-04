Back to [README.md](README.md)

# Testing

## Validation

### HTML
|Page|Validator|Result|
| --- | --- | --- |
| Home |![home](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-html-home.png) | ✅ |
| All Items |![All items](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validador-html-items.png) | ✅ |
| Item |![Item](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-html-item.png) | ✅ |
| Add & Edit Item |![Create Listing](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-html-add.png) | ✅ |
| Log In |![Log In](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-html-login.png) | ✅ |
| Sign Up |![Sign Up](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-html-signup.png) | ✅ |

### CSS

▷ While the live site's running smooth without any noticeable glitches, I'm wrestling with Bootstrap 5 variables to make them play nice with the CSS validation engine. It's a bit of a challenge, but I'm diving in to crack the code

Test Results CSS ❌

### JavaScript

- script.js ✅

![Validate JavaScript](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-js.png)

## Browser Friends

|Browser|Result|Pass/Fail|Notes|
| --- | --- | --- | ---|
| Google Chrome | All pages, load as expected. All features work as expected | ✅ | God bless Bootstrap |
| Firefox | All pages, load as expected. All features work as expected | ✅ | Amen |


## What's Lighthouse gotta say about 

▷ Struggling to wrangle Cloudinary into serving up media that fits all screens perfectly. It's a battle, but I'm digging in! No giving up here

|Page|Validator|Result|
| --- | --- | --- |
| Home |![home](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-lighthouse-home.png) | ⚠️ |
| All Items |![Items](https://github.com/mistersouza/localle/blob/main/static/assets/imageslocalle_validator-lighthouse-items.png/) | ⚠️ |
| Item |![Item](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-lighthouse-item.png) | ⚠️ |
| Sign up |![Sign up](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-lighthouse-signup.png) | ✅ |
| Login |![Sign up](https://github.com/mistersouza/localle/blob/main/static/assets/images/localle_validator-lighthouse-login.png) | ✅ |

## Manual Testing

- Home 

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Navbar|Click on 'logo'|Redirect to Home |Pass|Navbar present on all pages |
||Click on 'Home'|Redirect to Home |Pass|Navbar present on all pages |
||Click on 'Shop'|Dropdown menu activates|Pass|Navbar present on all pages |
|Dropdown|Click on All items|Redirect to All items |Pass|Navbar present on all pages |
|Dropdown|Click on Popular items|Redirect to All items |Pass|Navbar present on all pages |
|Dropdown|Click on New Arrivals |Redirect to All items |Pass|Navbar present on all pages |
|Navbar|Click on Signup icon|Redirect to Singup |Pass|Navbar present on all pages |
|Navbar|Click on Log Out |Log user out, redirect to Home|Pass|Navbar present on all pages |
|Banner|Open Home page. Ensure the banner loads|Hero section loads as it should |Pass| |
|Navbar| Click add icon. Ensure the details displayed add item form |Link works and form is displayed alright |Pass| |
||Open the Create Listing page and create a listing. Ensure it shows as first in the most recent listings section |The added listing is displayed as most recent |Pass| |
|Item Card| Click on the item card. Ensure it redirects to the correct item page |When clicked each card redirects to the correct item page |Pass| |
|| Click on the item card. Ensure it redirects to the correct single listing page |When clicked each card button redirects to the correct single listing page |Pass| |
|Footer|Ensure each one opens the correct page in a new tab | |Pass| |

- Items Page 

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
||Search listings by a combination of filters. Ensure the results displayed are accurate with the search filters|All search results match the search criteria |Pass| |
|Categories| Show as they should | They do indeed |Pass| |
|Categories|Click on all of the categories. Ensure they redirect to the appropriate page displaying only the search results. |All links redirect to the correct page displaying the correct results. |Pass| |

- Item

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Images section|Click on the main image. Ensure it opens using Lightbox. Ensure arrows appear to navigate through the images|When clicked the images open using lightbox. Arrows appear on the sides and allow you to navigate through the images|Pass||
|Listing details|Ensure all the car specs are accurate with the details used when creating the listing. Ensure all icons display as they should|All icons display as they should, and the information is accurate.|Pass||
|Save to favourites button|Click on the heart icon. Ensure the page reloads, a flash message is displayed with confirmation and the icon changes to full heart|When clicked the page reloads, a flash message is displayed with confirmation and the icon changes to full heart|Pass||
||As not authenticated user, Click on the heart icon. Ensure the page redirects to the login page|When clicked the page redirects to the login page|Pass||
||As an authenticated user, open your listing. Ensure the favourites button does not appear|When visiting your listing the favourites button does not appear|Pass||
|Seller Card|Click on the seller's image. Ensure the link leads to the user's account profile|When clicked redirects to the user's account profile|Pass||
|Email Seller form|Click on the Email Seller button. Ensure a modal pops up with a form to fill in|When clicked, the modal pops up with a form to fill in|Pass||
||Click on the Email Seller button. Ensure The listing title field is populated and read-only. |The listing title field is populated and read-only.|Pass||
||As an authenticated user, ensure the form is prefilled with the user's details|When clicked, a modal pops up with pre-filled form fields for existing details like name and email.|Pass||
||Fill all fields with correct data in the expected format. Click send a message. Ensure an email has been sent with the details entered using a test email address |Email was received with accurate details|Pass||
||Fill all fields with correct data but one. Click send a message. Ensure the form is not submitted and an appropriate message is displayed. Repeat for all fields. |Form did not submit, the appropriate message was displayed|Pass||
|Description|Scroll to the description section. Ensure the accurate description is displayed |The accurate description is displayed|Pass||

- Adding Item

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Form|To test car make/model dependancy first select model and ensure there are no drop down options. Then select car make. Ensure the car model field is populated with the correct options for each make|The car model dropdown has no options initially. The car model field is populated with the correct options for each make|Pass||
||Click on each drop down field to ensure correct options are displayed|Correct options are displayed|Pass||
||Fill all fields with correct data in the expected format. Click Submit. Ensure the listing was created by: 1. checking for flash message, 2. Go to Home page and find the card with the new item |When submitted success flash message is presented. The new listing card appears on the home page's recent listings|Pass||
||Fill all fields with correct data but one. Click Submit. Ensure the form does not submit and appropriate message is displayed. Repeat for all fields. |Form did not submit, appropriate message was displayed|Pass||

- Editing Item

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Form|||Pass|Tested at create item|
||Open edit item form. Ensure the form is populated with the correct item's details|The form is populated with the correct item's details|Pass||


- Delete item

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Switch toogle|Click on the delete. Ensure it toggles to confirmation button and edit button to cancel |When clicked the button toggle.|Pass||
|Cancel|Click on the 'cancel delete'. Ensure it resets both cancel and delete button. |The button are both reset to their original stage|Pass||
|Delete|Click on the 'confirm delete'. Ensure it deletes the item and the user is redirected to the item page. |The user is redirected to the my listings page. By checking in the admin pannel can be confirmed the was deleted|Pass||

- Log In

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Form|Fill all fields with correct data in the expected format. Click Sign In. Ensure Flash message appears and the user is redirected to the home page. To ensure the user is logged in: Open developer tools and navigate to application. On the side select cookies and check for sessionid being added. |When submitted success flash message is presented, the user is redirected to the home page. Sessionid is added to the cookies|Pass||
| | Fill in the form with incorrect details. Ensure the user is not logged in and flash message appears| Flash message appears in red letting the user know they have entered incorrect details. The user is not signed in| Pass| |
| | Click on the forgot password link. ensure it redirects to the reset password page.| The user is redirected to the reset password page| Pass| |
| | Click on the register here link. ensure it redirects to sign up page.| The user is redirected to the sign up page|Fail| I'm currently dedicated to ensuring the accurate display of a particular message.|

- Sign Up

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Form|Fill all fields with correct data in the expected format. Click Sign Up. Ensure Flash message appears and the user is redirected to the my profile page.|When submitted success flash message is displayed on the wronge page, the user is redirected to the my profile page.|Fail|I'm currently focused on ensuring that the message displays correctly.|
||Fill all fields with correct data but one. Click Sign Up. Ensure the form does not submit and appropriate message is displayed. Repeat for all fields. |Form did not submit, appropriate message was displayed|Pass||
| | Click on the Already have an account? Log In link. ensure it redirects to the login page.| The user is redirected to the login page| Pass| |


- Sign Out

|Section|Test Action|Expected Result|Pass/Fail|Comments|
| ---| ---| ---| ---| ---|
|Log out button|Click on the Log out button.To ensure the user is logged out: Open developer tools and navigate to application. On the side select cookies and check for sessionid being removed.The user should be redirected to the the home page. Ensure flash message is displayed |The user is redirected to the home page. Flash message is displayed on wrong page. Sessionid is removed from cookies.|Fail|I'm currently in the process of making sure that the message appears accurately.|