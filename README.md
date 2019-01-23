# Milestone Project 2 - UK Road Transport Greenhouse Gas Emissions 1990-2016 Interactive Data Dashboard

## Table Of Contents

[1. Introduction](#introduction)

----------

[2. UX](#ux)

[2.1. Wireframes](#wireframes)

----------

[3. Features](#features)

[3.14. Features Left to Implement](#features-left-to-implement)

----------

[4. Technologies Used](#technologies-used)

----------

[5. Testing](#Testing)

[5.1. Code Validation](#code-validation)

[5.2. User Stories Testing](#user-stories-testing)

[5.3. Browser and Responsiveness Testing](#browser-and-responsiveness-testing)

[5.4. Known Issues](#known-issues)

[5.5. Other Testing](#other-testing)

----------

[6. Deployment](#deployment)

----------

[7. Credits](#credits)

[7.1. Text Content](#text-content)

[7.2. Media](#media)

[7.3. Acknowledgements](#acknowledgements)

--------------------

## Introduction

This project is an SPA (single page application) interactive data dashboard. The dashboard visualises publically available data on emissions from road transport within the UK between the years 1990 and 2016.

The dashboard primarily relies on [DC.js](https://dc-js.github.io/dc.js/), a JavaScript-based charting library. DC in turn relies on [Crossfilter](http://crossfilter.github.io/crossfilter/), a dataset explorer, and [D3.js](https://d3js.org/), which is utilised by DC in order to render charts in CSS-friendly SVG format.

## UX

The typical user of this application is likely to be someone interested in data visualisations, being a person with at least some knowledge of how to read charts. The subject (environmentalism) of the dashboard may also be of interest to the general public, considering that environmental issues are often featured in the media. Most people are at least vaguely familiar with the greenhouse gas effect and the role that road transport has in emitting greenhouse gases.

Because of this potential broad user-base, it was decided to keep the dashboard relatively simple; in total, there are only 4 charts on the dashboard, not including a number of dynamic and static number displays. This simplicity is hoped to reduce the chance of users experiencing information overload.

### Wireframes
Prior to work beginning on the app, wireframes were created in order to aid the design progress and provide direction during actual coding. These can be found in the "mockups" folder in the root directory of the project.

The wireframes served as the initial inspiration for the project, although the finished project diverges from them on a number of points. DC.js, Crossfilter and D3.js are versatile and (to my mind) complex libraries, and this project was a learning exercise perhaps as much as it was an exercise in already acquired skills. The differences between the wireframes and the finished project are detailed throughout this readme.

## Features
The website is an SPA data dashboard consisting of a single HTML page, utilising JavaScript to render the charts and jQuery for additional data rendering and DOM manipulation. Styling is achieved with CSS using SCSS-syntax pre-processing. The data the app works with is in JSON format.

### Loading System
As the app was being developed, it was discovered that page loads looked untidy; content, especially charts, took much longer to load then other content even on relatively fast connections. It was decided to give the app a loading overlay which would cover the rest of the page whilst the main content is loaded. A plain green background is used, with a spinning graphic created purely with css borders and the text "Loading...". jQuery is used to detect when the page is fully loaded, and when this happens the loading overlay fades out and the main content comes into focus. 

A delay of one second is used to ensure that the loading overlay is visible for at the very least one second. This ensures that the user is always able to see what is happening; users on very fast connections or those who have cookies saved might become confused by a green overlay that flashes on and off very quickly.

### No JavaScript Detection
Without JavaScript no charts can be rendered and the dashboard is essentially useless. Users without JavaScript see a green overlay with the words "No Javascript detected! Please enable JavaScript to view the dashboard". This is accomplished through a class on the body element called 'no-js', in combination with a <noscript> element containing the no JavaScript content. If a page loads with JavaScript enabled, the no-js class is removed and the <noscript> element is ignored, allowing the rest of the content to load as intended. Both a no-js class and a <noscript> element were neccesary to implement due to the loading overlay, which would display instead of the <noscript> content if no JavaScript was detected.

### Navbar
At the top of the app there is a navbar that serves as the main heading for the page. Since the app is an SPA, there are no links to other pages.

### Touchscreen Warning
Users accessing the app on a touchscreen-enabled device see a Bootstrap alert just below the navbar informing the user that the app is best viewed on a device with a mouse or trackpad. The ability to hover is essential to the full experience of the dashboard, enabling tooltips with additional information to display on the charts when the user hovers over them. The alert thus serves as a notice to the user that their experience of the dashboard without a hover-enabled device will be sub-optimal. The alert only shows for media without hover by using a CSS media query.

### Introductory Text and Highlights
Immediately below the navbar, there are two sections rendered side by side using Bootstrap's grid system. The left section contains some chart icons rendered using the [Font Awesome](https://fontawesome.com/) toolkit. These icons are purely aesthetic. In addition to the icons there is some introductory text. 

Early on in development the introductory text contained its own heading, contained several paragraphs of text, as well as an image. However, it was decided that a heavy introductory section was unnecessary, took up too much screen real estate, and obstructed the main content of the app from coming into the user's focus quickly. It was therefore decided to make the introductory section as brief as possible.

The Highlights section contains three number displays:

**Total Emissions Figure**
The figure representing the total emissions over the period is rendered using dc.js's numberDisplay class. The group used to render the figure sums all the numerical values with the key "Emissions" within the JSON data and returns this value.

**Average Emissions Figure**
Similarly to the total emissions figure, the average emissions figure uses numberDisplay to generate a value. The value is calculated similarly to the total emissions figure by summing all the emissions values. This value is then divided by the number of years in order to come to an average.

However, this value is not rendered to the page using the numberDisplay class itself. Instead, the generated value is printed to the page using jQuery. This is because the numberDisplay generated value for the average figure changes when the user changes the select boxes found on the page, as the select boxes alter how the data is filtered. Since the average emissions figure is supposed to represent the average emissions for all of the period and for all vehicle types, it does not make sense to have the average emissions figure dynamically change. jQuery was considered to be an easy workaround to this problem.

**Most Polluting Year Figure**
The third Highlights figure represents the most polluting year on record. This value is generated in a similar fashion to the average emissions figure, with numberDisplay being used to generate a value and jQuery being used to render the value to the page. The value is calculated using a group that returns from the data all years and their corresponding emissions values. By default the group returns the highest emissions value (and corresponding year) for the numberDisplay. This figure is not present in the wireframes and was added during development in order to bulk up the Highlights section.

**Deviations from wireframes**
Some deviation from the wireframes exists here. The wireframes suggest that the Highlights and introductory text are grouped together, and early on in development this was the case. However, the side by side layout was chosen in order to cut down on the viewport height utilised by the app, moving the main chart content up allowing the user to notice it quicker.

In the wireframes there are two number displays (total emissions and average emissions). It was decided during development to increase this number to three in order to bulk up the Highlights section and provide the user with more information at a glance.

### Main Content Overview
The main content of the app consists of four charts divided into two sections. The **Total Emissions Over Time** section consists of a line chart and a multi-line composite chart. The **Total Emissions By Type Of Vehicle** section consists of a pie chart and a bar chart. In addition to the charts, each section contains two select boxes to enable manipulation of the charts, one select box towards the top of each section and one select box towards the bottom. There are also a few bullet points of text in each section giving an overview of the data contained within the charts, as well as some dynamic text which alters depending on the current selection as determined by the select boxes.

### Responsiveness
Although the project brief does not indicate that the app must be fully responsive (in line with the lack of support for responsiveness in DC.js), it was felt that some degree of responsiveness was neccesary. The charts are fairly large, with the default size of the line chart for example being 700px by 700px. To have two charts side by side would therefore require at a minimum 1400px width of screen real estate. With a stacked design, the amount of viewport needed would reduce to a minimum of 700px.

It was decided to accomodate both a side-by-side and stacked design. Using Bootstrap's grid system, the charts are stacked up to and including 1199px viewport width. At 1200px and above, the charts in each section are aligned side by side.

In order to accomplish this responsiveness system, the chart sizes themselves had to be manipulated, since it should be noted that two 700px width charts on a 1200px width viewport would overlap. To counter this, the charts are set up to shrink to 600px width (500px for the pie chart which has a default width of 600px) on viewport width sizes between and including 1200px and 1433px using a custom responsiveness function.

This responsiveness function is achieved with a combined jQuery/dc.js solution. The function has to be called in two situations; when the page is loaded to detect the viewport's size, and again if the user resizes the viewport when the app is already loaded. The function essentially works by passing in new arguments to the width methods of the chart objects, and then in the case of a window resize event, re-rerendering the charts. In addition, charts which have legends also have new arguments passed into the size and positioning methods of the legend objects.

Using this responsiveness system gives the app the flexibility to be supported down to 920px, with the ability to take advantage of extra screen real estate on larger viewports by having charts side by side where possible.

### Select Boxes
The select boxes enable the full functionality of DC.js and Crossfilter by allowing the user to dynamically change the data displayed in the charts based on the criteria they select via the select boxes. There are in total four select boxes on the page, two for each section. The two in each section are identical; two were added as a usability boost. This is because the large charts take up a high proportion of screen real estate on all but the largest media, and it was felt that the app would become too cumbersome if the user had to scroll back to the top of a section to manipulate the data every single time they wished to do so. Identical select boxes at both the top and bottom of sections help mitigate this issue.

For the **Total Emissions Over Time Section**, the select box is populated by a list of vehicles. For the **Total Emissions By Type Of Vehicle** section, the select box is populated by a list of years. Both select boxes contain as their default and unfiltered option an "All Vehicles" or "Whole Period" value respectively.

The select boxes are multiple; this allows the user to select multiple options, for example, viewing the emissions data for both petrol and diesel cars. If the user tries to include the default option in a multiple selection, only the default option will be selected; it doesn't make sense for the user to select "All Vehicles" along with petrol and diesel cars for example. this functionality is accomplished with jQuery.

The top and bottom select boxes in each section are rendered differently. The top select box in each section is rendered using dc.js's selectMenu class. This select box is then cloned using jQuery to the bottom select box, making both select boxes contain identical values. 

The select boxes' selections are also cloned. For example, if the user selects "Cars - Petrol" and "Cars - Diesel" in the top select box, the bottom select box will also have "Cars - Petrol" and "Cars - Diesel" selected. This is accomplished with one line of jQuery which fires on a select box change event.

The select boxes include instructions; users are informed of the appropriate hotkeys to make multiple selections on both Windows and Mac platforms. Although multi-select boxes are found across the web, it is presumed the multi-select functionality will not be obvious to all users.

The select boxes can be reset via the reset buttons located directly below the dynamic text in each section. Each reset button only resets the charts within its own section. The reset button gives users an easy way to reset the charts.

### Line Chart
The line chart is the topmost chart when the layout is stacked, and the top-left chart when the layout is in columns. This chart represents emissions data over time, with the years on record on the x axis and emissions in kilotons on the y axis. The line represents the emissions data of either all vehicles, or a custom selection of vehicles as defined by the user. The chart is rendered using DC.js's lineChart class. If the user hovers over the line, they can see the exact figure in kilotons of the emissions for a particular year.

### Composite Chart
The composite chart is the second chart from the top when the layout is stacked, and the top-right chart when the layout is in columns. Similarly to the line chart, this chart represents emissions data over time with the years on record on the x axis and the years on record on the y. Unlike the line chart, the composite chart allows a comparison of trends for different vehicles by rendering multiple lines at once, this being achieved with DC.js' compositeChart class. The user can select which lines they want to render using the select boxes.

The chart also contains a legend, with each vehicle type colour coded. If the user hovers over an item in the legend, the corresponding line on the chart becomes bolder, and the opacity of the other lines is reduced, allowing the user to easily see which item on the legend represents which line.

If the user hovers over a line, the tooltip displayed shows the vehicle type, year and emissions value for that particular data point.

### Pie Chart
The pie chart is the third chart from the top when the layout is stacked, and the bottom left chart when the layout is in columns. The pie chart allows a clearer visualisation of the proportion of emissions generated by each vehicle type. The pie chart can be filtered via the select boxes to show data for either the whole period, or one or more years.

The pie chart features a legend showing what vehicle type corresponds to what colour. Hovering over an item in the legend highlights the corresponding pie chart segment. The segment is also highlighted if the user directly hovers over it; additional information is displayed on hover in a tool tip, containing the vehicle type, emissions in kilotons and also the exact percentage figure of the segment.


Since some vehicle types (e.g. LPG vehicles) make up a tiny fraction of emissions, some of the pie chart's slices are too small to contain labels

### Bar Chart
The bar chart is the bottommost

<a name="ie-feature"></a>
**IE Compatibility**

For users using IE, the music subpages look a little different. The Spotify widget is unsupported in IE and does not render. Instead, users of IE see a simple track list formatted using an ol element. IE versions 9, 10 and 11 have been tested and function as intended.
<a name="video"></a>
### Video Pages (featured-video.html and subpages)
The video pages all feature the same layout. The currently loaded video is displayed using a YouTube iframe towards the top of the page. Below the iframe, YouTube img thumbnails are used to create links to other video pages, with glyphicon-play icons overlayed on the thumbnails to indicate to the user that these links will take them to the video content. On small viewports the default three thumbnails per row is collapsed to one on top of the other stacked.
<a name="photo"></a>
### photo-gallery.html
This page contains image media, implemented using the lightgallery jQuery plugin. The page consists of two rows of images with a title heading, each representing a separate jQuery slideshow. The lightgallery functionality enables the user to click/tap on an image to make it fullscreen, with the ability to swipe or click through the other images in the slideshow. On smaller screens, the default row of four images is collapsed to each image being stacked.

### Features Left to Implement
Some features are left open to the idea of implementation, but were not featured in this release.

**Social share buttons on news articles**

All of the major social networks provide the ability for developers to specify how they wish website pages to be shared, as well as the ability to implement specific social media sharing buttons on pages. The reasons why this feature was not implemented are detailed in the [news-article (subpage)](#news-article-subpage) section.

**Newsletter popup on index.html**

The idea to have a promotional popup promoting The Monkees' newsletter on the website's homepage was considered, inspired by similiar functionality on the [Led Zeppelin homepage](http://www.ledzeppelin.com/ "Led Zeppelin Homepage"). However, this functionality was considered to be beyond the project's requirements, and would also constitute dummy functionality since there are no server-side processes currently active on this project to enable a user to sign up to a newsletter.
 
## How Existing Features Fulfil User Requirements
This section details how the features implemented in the current release of the project meet the requirements for the users discussed in the UX section.

**Hardcore fan, likes going to live performances**

This type of user, who is interested in live performances, is served by tour.html, which contains information relating to The Monkees live performances as well as links to buy tickets.

**Newly acquainted fan, wants background history and music**

This type of user is able to read the background history of The Monkees on index.html. They are also able to engage with the multimedia content found on the music and video subpages, as well as view image content on photo-gallery.html. In addition, there are multiple locations on the website where this user may visit The Monkees' social media channels.

**Blog writer/Journalist**

This type of user can find the content of interest to them on news.html and its subpages. They are given a clear method of contacting the band for further statements via the aside on news.html.

**Potential Client**

This type of user is able to navigate to book-us.html. They are able to see a small testimonial section which serves as marketing, and are then able to use a simple contact form in order to initiate the booking process or to obtain more information. The validation on the form helps ensures the user enters workable information.

## Technologies Used
### [HTML5](https://www.w3.org/standards/webdesign/htmlcss)
The project's markup uses HTML5, and makes as much use of HTML5 semantics as possible using W3C standards.

### [CSS3](https://www.w3.org/standards/webdesign/htmlcss)
The markup is styled using CSS3, which is maintained in separate css files where possible in keeping with the standard of separating structure and presentation.

### [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
The Bootstrap 3 framework was used in order to simplify the process of generating the website's structure and ensuring its responsiveness.

### [Real Favicon Generator](https://realfavicongenerator.net/)
This tool was used in order to construct favicons for the project. How favicons are rendered is different depending on the browser or platform used, and this tool simplifies the process by providing the appropriate markup and icon for each platform.

### [JQuery 3.3.1](https://jquery.com)
jQuery is utilised by the project for a number of areas of functionality.

1. Boootstrap depends on jQuery for its Javascript components, including the collapsed hamburger navigation icon.
2. jQuery is used to implement the Jssor slider on index.html.
3. The image slider on photo-gallery.html depends on jQuery for slideshow functionality.

### [Font Awesome 5.3.1](https://fontawesome.com/)
The project uses Font Awesome to generate the social media icons found in the header element of each page.

### [Google Fonts](https://fonts.google.com/)
The project uses Google Fonts to increase the visual appeal of the project.

### [Spotify Play Button](https://developer.spotify.com/documentation/widgets/generate/play-button/)
The music subpages use this Spotify iframe in order to embed audio playback.

### [YouTube iframes](https://www.youtube.com/) 
The video pages make use of the embed feature available on YouTube videos.

### [Lightgallery 1.6.11](http://sachinchoolur.github.io/lightGallery/) 
Lightgallery is a customisable media slideshow based on jQuery that is utilised by this project on photo-gallery.html.

### [Optimizilla](https://imagecompressor.com/) 
Used for compression of some website images.

### [jitbit.com Unused CSS Finder](https://www.jitbit.com/unusedcss/)
Used to check the project's css for redundant selectors.

### [convertcase.net](https://convertcase.net/)
Used to quickly format news article headings to correct style.

### [Browserling](https://www.browserling.com/internet-explorer-testing)
Used to test the app on IE9.

## Testing

### Code Validation
The W3C code validators for [HTML](https://validator.w3.org/) and [CSS](https://jigsaw.w3.org/css-validator/) were used to check markup validity. These tools helped locate some markup issues, including h3 tags incorrectly closed with /h4, along with identifying obsolete code, such as <script type="javascript">. This helped resolve any errors in the markup and no errors present themselves on any of the html or css files.
<a name="userstories"></a>

### Accessibility
A high level of accessibility, though desired, was not considered to be of the highest priority for this app due to the visual nature of charts; it is simply not possible to replicate accurately the visual effect of things like proportion and trends through the medium of a screen reader. Regardless, the [WAVE](http://wave.webaim.org/about) accessibility tool by WebAIM was used in order to check the app for accessibility issues. One issue found was an ambiguous link contained within the introduction text. The concept of ambiguous links (as defined by [W3C]( https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html) was unknown to me prior to using this tool, so WAVE proved useful to both boosting the app’s accessibility as well as to my own learning.

### User Stories Testing
Each of the user stories identified in the UX section was simulated. The results of these tests are as follows:

**Hardcore fan, likes going to live performances**

Upon landing on the homepage, I am able to see Tour in the main navigation. Clicking/tapping this link takes me to tour.html. I am able to see the information displayed in the tour dates table, and if I click on any of the "Buy Tickets" buttons, I am taken to a website where I may purchase tickets. This new window opens in a new tab, keeping me on The Monkees' website so that I don't forget what page I have come from.

**Newly acquainted fan, wants background history and music**

Landing on the homepage, my attention is drawn to the large hero slider. The responsive nature of the slider means I am able to view it on both desktop and mobile. Scrolling down the homepage, I encounter a link to some music and some recent news. I am able to follow these links if I choose to. Towards the bottom of the page, I can read some history of The Monkees. I can clearly see "Music", "Video" and "Photo Gallery" in the main navigation. Following these links allows me to view the multimedia content there, and I don't encounter any problems. On the music subpages, since I am a Spotify user I am able to open the embedded player directly in my Spotify app. Simulating a non-Spotify user, I am able to access 30 second previews of the tracks, with the option to go to full length tracks available to me if I create an account with Spotify. Finally, I can see social media links in the main navigation, clicking on these opens the respective social media channels in new tabs.

**Blog writer/Journalist**

As this type of user I am able to clearly see News in the main navigation. Clicking this link takes me through to news.html, and after a quick scan of the page I can see an email address that I can use to contact The Monkees regarding a recent news story. Clicking this email address opens up my mail client on my device.

**Potential Client**

As this type of user I can see Book Us in the main navigation. Using this link takes me to book-us.html. I am reassured by the testimonials from recent clients, and the contact form validates correctly, ensuring that I don't leave any field blank and that my email address is in the correct format. Failing to fill all contact form fields, or entering an email address without an @ symbol, prevents me from submitting the form and presents me with an error message on all tested browsers. Upon submitting the form I am taken to a page that confirms that the form was successfully sent.
<a name="browser"></a>
### Browser and Responsiveness Testing
The project was primarily developed on Google Chrome version v69.0.3497 on a Windows PC with a default maximised screen size of 1936px. The project was developed mobile-first, so the look of the project was tailored to all screen sizes above 320px with continuous testing during development to ensure that the site continued to be responsive. In addition to Google Chrome's developer tools simulating devices, a real iPhone 7 running iOS v11.3 was used to test the app with the native Safari browser. The website was also tested on Firefox v62.0, Safari v11.0.2 and Edge v42.17134.1.0. There were no browser cross-compatibility issues detected during testing and the app was found to run smoothly on all of the previously mentioned browsers.

In addition to modern browser testing, the app was tested on IE version 11.0.9600.19130. A tool from [browserling](https://www.browserling.com/internet-explorer-testing) was also used in order to simulate the website running on IE9 and IE10. The only issue found during IE testing was that the Spotify player does not display correctly. On further investigation this was discovered to be due to the Spotify player [not being supported in IE](https://support.spotify.com/uk/using_spotify/the_basics/webplayer/). This led to additional content being added for the benefit of IE users which is detailed [here](#ie-feature).

### Known Issues
An issue occurs intermittently on the video pages, where the YouTube iframe occasionally fails to load. This problem appears unique to Chrome, as it never occured on any other tested browsers. It also appears to be a [documented issue](https://stackoverflow.com/questions/12009423/what-does-status-canceled-for-a-resource-mean-in-chrome-developer-tools). The issue was not rectified in this release due to the time it would take to debug and it only occuring in about 1 in every 10 page loads.

### Other testing
Family and friends of the developer from non-technical backgrounds were also asked to explore the site. The results of these tests revealed no issues and all of the users agreed that the site functions well.

## Deployment
The project is deployed on GitHub Pages, available [here](https://dhamma1991.github.io/milestone-project-one/index.html). An issue occured when first deploying; the src path system on GitHub Pages was found to be stricter than on c9 where the project was developed, with links that began with a '/' breaking. A site wide modification of the links had to be completed before the website would function properly on GitHub Pages.

## Credits

### Text Content

**History section on index.html**

https://en.wikipedia.org/wiki/The_Monkees

**NEWS ARTICLE TEXT**

**News Article 1**

https://www.monkees.com/article/the-monkees-to-release-christmas-party-their-first-ever-holiday-album

**News Article 2**

https://www.monkees.com/article/new-dates-michael-nesmith-and-the-first-national-band-redux

**News Article 3**

https://www.monkees.com/article/now-streaming-the-rhino-podcast-the-monkees-with-micky-and-reissue-producer-andrew-sandoval

**News Article 4**

https://www.monkees.com/article/the-monkees-present-the-mike-micky-show

**News Article 5**

https://www.monkees.com/article/pre-order-the-archies-meet-the-monkees-comic-book

**News Article 6**

https://www.monkees.com/article/tickets-now-avail-michael-nesmith-the-first-national-band-return-to-the-stage

**News Article 7**

https://www.monkees.com/article/announcing-more-of-the-monkees-super-deluxe-edition

**News Article 8**

https://www.monkees.com/article/in-stores-now-summer-of-love

**MUSIC SUBPAGE TEXT**  

**forever.html**

https://www.rhino.com/product/forever

**good-times.html**

https://www.rhino.com/product/good-times

**headquarters.html**

https://www.amazon.com/Headquarters-Sessions-Monkees/dp/B000KAHJT0

**instant-replay.html**

http://monkees.wikia.com/wiki/Instant_Replay

**more-of-the-monkees.html**

https://www.amazon.com/More-Monkees/dp/B004GE818Y

**pool-it.html**

https://en.wikipedia.org/wiki/Pool_It!

**the-monkees.html**

https://en.wikipedia.org/wiki/The_Monkees_(album)

### Media
All images used in this project which were not provided with the assessment brief are referenced here.

**Nav and body background image**

https://www.toptal.com/designers/subtlepatterns/full-bloom-pattern/

**Header background image**

http://longwallpapers.com/retro-wallpapers-high-quality/

**Monkees logo**

http://www.clker.com/clipart-411039.html

**Favicon**

https://www.amazon.com/The-logo-Guitar-Button/dp/B0028MGECG

**ALBUM IMAGE REFERENCES**

**Forever**

https://www.monkeeslivealmanac.com/blog/budget-priced-compilation-to-be-released-in-august

**More of the Monkees**

http://1.bp.blogspot.com/-4WNtUuW6hFM/TyghBigQ7FI/AAAAAAAAjzg/fEtFgZB4AxU/s1600/3.jpg

**Headquarters**

https://monkees.coolcherrycream.com/picturedb/albums/album-covers

**The Monkees**

https://monkees.coolcherrycream.com/picturedb/albums/album-covers

**Instant Replay**

https://monkees.coolcherrycream.com/picturedb/albums/album-covers

**Pool It**

https://monkees.coolcherrycream.com/picturedb/albums/album-covers

**Good Times**

https://monkees.coolcherrycream.com/picturedb/albums/album-covers

**HERO SLIDER**

**Hero image 2**

http://comforttv.blogspot.com/2015/07/the-20-best-monkees-songs-and-5-worst.html

**Hero image 3**

http://psychedelichippiemusic.blogspot.com/2013/10/the-monkees.html

**NEWS ARTICLE IMAGES**

**news-article-1**

https://www.monkees.com/sites/default/files/styles/large/public/monkeesxmas.jpg?itok=Z_QCnBOh

**news-article-2**

https://www.monkees.com/sites/default/files/styles/large/public/37117232_1854914371242431_7954927632951279616_n.jpg?itok=i5xp3454

**news-article-3**

https://www.monkees.com/sites/default/files/styles/large/public/the-rhino-podcast-1400x1400_2.jpg?itok=HIDyAi0X

**news-article-4**

https://www.monkees.com/sites/default/files/styles/large/public/monkees-present-crop-w-background%25255b3%25255d.jpg?itok=bsRxT8T8

**news-article-5**

https://www.monkees.com/sites/default/files/styles/large/public/thearchies_4retvar-web.jpg?itok=XA0jrUg_

**news-article-6**

https://www.monkees.com/sites/default/files/styles/large/public/michaelnesmith.jpeg?itok=ILSmDix1

**news-article-7**

https://www.monkees.com/sites/default/files/styles/large/public/more-of-the-monkees-prod-shot.jpg?itok=WmcySETk

**news-article-8**

https://www.monkees.com/sites/default/files/styles/large/public/081227937980.sml_.jpg.jpg?itok=I8kEGiIL


**BOOK US TESTIMONIALS**

**John Smith**

https://c1.staticflickr.com/4/3231/3290148587_767458eb9c_b.jpg

**Jane Doe**

https://orig00.deviantart.net/4e8e/f/2015/318/7/7/yo_by_themajestynextdoor-d9gpmv7.jpg


**PHOTO GALLERY**

**monkees-tv-show**

https://www.mprnews.org/story/2018/01/04/monkees_no_1

**the-monkees-196X**

https://parade.com/224998/nancyberk/showbiz-analysis-with-the-monkees-micky-dolenz/

**the-monkees-studio-session**

http://www.zoomerradio.ca/uncategorized/may-31-1966-the-monkees-began-filming-their-first-tv-series/

**daydream-believer-still**

https://mashable.com/2016/02/05/monkees-new-album-tour/?europe=true

**micky-dolenz**

https://en.wikipedia.org/wiki/Micky_Dolenz#/media/File:Micky_Dolenz_at_the_2009_Tribeca_Film_Festival.jpg

**micheal-nesmith**

https://medium.com/@jeremylr/still-rollin-with-the-flow-twists-and-turns-with-smart-monkee-michael-nesmith-29f46b206dd2

**peter-tork**

https://en.wikipedia.org/wiki/Peter_Tork#/media/File:WikiTork.jpg

**davy-jones**

https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_675,w_1200,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492810233/cheats/2012/02/29/monkees-singer-davy-jones-dies/davy-jones-monkees-dies-cheat_f36ft2

### Acknowledgements
I recieved inspiration for this project from a number of band websites around the web, in particular the [Alice In Chains](http://aliceinchains.com/), [Guns N' Roses](https://www.gunsnroses.com/), [Foo Fighters](https://foofighters.com/) and [Led Zeppelin](http://www.ledzeppelin.com/) websites. [The Monkees Official Website](https://www.monkees.com/) was also an inspiration.

References
Intro text taken with modifications from https://en.wikipedia.org/wiki/Greenhouse_gas

Scroll effect (delete if needed) - https://scrollrevealjs.org/guide/hello-world.html

congestion image - https://e3.365dm.com/16/11/1096x616/a7d3092211c1414867d45fd9b660a8e4742e80027de15cf0853ae24f6e540144_3843067.jpg?bypass-service-worker&20161216060748

navbar background image - https://www.dealfuel.com/wp-content/uploads/2015/06/color5.png

image resize tool - https://imageresize.org/

css popup - https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup

back to top function - https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

loading screen (delete if needed) - https://ihatetomatoes.net/create-css3-spinning-preloader/

favicon - https://www.kisspng.com/png-earth-drawing-cartoon-sketch-planet-cartoon-1506130/