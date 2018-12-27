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

This project is an interactive data dashboard created with the dc.js library as a SPA (single page application). The dashboard visualises publically available data on emissions from road transport within the UK between the years 1990 and 2016.


## UX

The primary users of this website are going to be fans of The Monkees. These fans will vary in regards their familiarity with The Monkees' music, ranging from truly hardcore fans, to fans less acquainted who may only be familiar with one or two songs. In addition, users such as journalists may use the website in order to source news material, and potential clients may be looking to hire The Monkees for private live performances.

A number of user stories have been generated in order to shed light on the type of experience different users expect:

**Hardcore fan, likes going to live performances**

This type of fan is very well acquainted with The Monkees and their music. This fan is primarily interested in finding information on The Monkees' publicly available live performances and where they can buy tickets.

**Newly acquainted fan, wants background history and music**

This type of fan may only be familiar with The Monkees as a name, or only knows one or two songs and has only recently decided that they like this band. This type of fan will want to hear music, gather information and perhaps view wider multimedia content such as videos and images. For this type of fan, the website must serve as a promotional tool that draws the fan into a deeper engagement with The Monkees as a brand. In addition, this type of fan, who is unlikely to be connected to The Monkees' social media, may also wish to see a central hub of social media links through which the fan can connect.

**Blog writer/Journalist**

This user may not be a fan of The Monkees, but they write for a popular Internet blog or traditional newspaper. This user will be primarily viewing the news section, using the articles as the basis for content hosted on their own platforms. They will wish to see clearly organised news content, with an obvious method of contacting The Monkees' management for press statements and clarifications.

**Potential Client**

This user wishes to book The Monkees for a private performance. They will wish to see testimonals that confirm The Monkees are a good investment, and will want a clear and simple method of contacting the band to initiate a booking.

### Wireframes
Prior to work beginning on the website, wireframes were created in order to aid the design progress and provide direction during actual coding. These can be found in the "mockups" folder in the root directory of the project.

The finished project diverts from the wireframes on a number of points, these are mentioned in detail in the Features section.

## Features
The website is constituted of 26 html pages. 7 of these (index.html, news.html, tour.html, book-us.html, music.html, featured-video.html and photo-gallery.html) are located within the project's root directory and are directly accessible via the site's main navigation. Of the remaining 19 html pages, 8 constitute news articles that are found within the news-articles directory, 7 are music pages found with the music-pages directory, and 3 are video pages found with the video-pages directory. There is also a dummy action-page.html that the user is taken to when they submit the form on book-us.html.

### Main Navigation
The main navigation is consistent across all pages. It consists of 7 links labelled Home, News, Tour, Book Us, Music, Video, and Photo Gallery. The navigation is achieved with Bootstrap and is responsive, collapsing on all viewports less than 768px wide. When the navigation is collapsed it can be revealed if the user clicks or taps on the hamburger icon.

In addition to the site navigation links, there are external links to The Monkees' social media channels that are located directly below the main navigation. When click/tapped on these open a new browser tab to then take the user to that social media channel.

In the wireframes for this project the navigation consisted of 8 links, rather than the 7 that were implemented. The reasons for this change are elaborated on in the [index.html](#index) section below.

### Footer
The footer is also consistent across all site pages. The footer consists of 5 links; Home, Book Us, Facebook, Twitter and Youtube. The Home link takes the user back to index.html. The Book Us link takes the user to the Book Us page, this link serving as an additional call to action. The other links take the user to the corresponding social network, which opens in a new browser tab so as to prevent the user forgetting what page they have come from.
<a name="index"></a>
### index.html
As per normal convention this page acts as the site's home page. Below the main navigation the user will encounter a large and eye catching hero slider based off Jssor's Bootstrap jQuery slider. The slider is responsive and also touch-enabled for the benefit of mobile and other touch-enabled devices.

Below the Jssor slider the user will encounter a Bootstrap row with 2 columns. The left column contains the latest music release from The Monkees, with links to the album page and an external "Buy Now" link that takes the user to amazon.com. The right column contains latest news, allowing the user to navigate to the individual news articles, or go to news.html which contains a full list of news stories. All the news entries are dated, and these, along with all dates on the site are formatted using the time element. Where needed the appropriate datetime attribute is added to time to increase the machine-readability of the app's dates.

Below the first Bootstrap row, the user encounters the History section which gives a brief overview of the history of The Monkees, along with embedded images of the individual band members as well as a group photo at the end of the section. This deviates from the original wireframes in that initially the History section would have had its own dedicated html page. The decision was made to integrate the History section onto index.html for three reasons:

Firstly, this fleshes out the content on index.html, which without the inclusion of the history section contains sparse content. Although this is not necessarily a bad choice (compare for example the sparsely filled out [Guns N' Roses homepage](https://www.gunsnroses.com/ "Guns N' Roses Homepage")), it was felt that The Monkees, with a history stretching back over many decades, should have their History content as a central feature of their website.

Secondly, an integrated History section reduces the size of the project and the size of the main navigation. A smaller navigation in particular reduces the chance of overloading the user with too many options, thus an integrated History section provides a boost to the site's overall usability.

Thirdly, the History section provides a good place to implement an additional "Book Us" call to action aside from the main navigation and footer. Combining the index and history pages makes it more likely that the user will see this call to action, since almost all users of the site are going to land on the home page first. Having multiple calls to action on a webpage is [good UX](https://goodui.org/).
<a name="news"></a>
### news.html
This page acts as a central hub of news articles. The page is minimal, consisting of two Bootstrap columns of 4 news heading each, with an aside element at the bottom of the page containing information for journalists and blog writers on how to get in touch with the band for press statements. Each news heading links to a seperate news page. A deviation from the wireframe exists here in that the aside element was added to the project during development. This came about as it was thought that journalist/blog-writer type users would want to see this feature.

### Subpage Navigation
All of the subpages in the site (news articles, music pages and video pages) have a sub navigation that is located directly below the page header element and is repeated at the bottom of each subpage so that the user doesn't have to scroll up in order to access the sub navigation, improving site usability and accessibility. The sub navigation allows the user to navigate to the next or previous piece of content without heading back to the main page. The video pages on the site work a bit differently; although they possess a sub navigation, the layout of the video pages allows the user to access any other video page from all of the video pages by using the video thumbnail links, so there is no "All Videos" link.

A deviation from the wireframes exist in that for the music and news-article subpages, the sub navigation on the finished project sits below the header and above the page title whereas in the wireframes it is positioned below the page title. This change was implemented when validating the code through the [W3C validator](https://validator.w3.org/) and discovering that article elements should contain nested headings. It was therefore judged to be better to position the page headings within the main article elements. This change was not carried over to the video subpages since they contain much less content and do not have a unique page title.

### News Article Subpage
The news articles all feature a unique layout; they contain a different number of paragraphs, some have ordered lists and all have one image. The unique layout for each page is necessary in order to cater for the varying content. All of the news articles feature links to external content, these opening in a new browser tab. 

In the wireframes it was debated as to whether to include the full news articles or just snippets, with links to the full content hosted on external platforms. In the end it was decided to include the full content on the website, as this would flesh out the pages and keep the user engaged with the website. In addition, the wireframes included social media share buttons so that the user could easily share stories in a format specified by the developer. This feature was not included in the current release due to a lack of clarity in the early stages of the project as to what the final URL of the project would be. It was also judged to be a non-essential feature, as users are still able to share any of the pages on the website, the only downside being that the page sharing has not been tailored to best reflect the content as judged by the developer.
<a name="tour"></a>
### tour.html
This page contains a responsive table generated with Bootstrap's list-inline class. It features a number of tour dates with the date of each performance, location, and a link to buy tickets from a third party vendor.
<a name="book"></a>
### book-us.html
The Book Us page is comprised of two components. The "Testimonials" section contains two quotes from previous clients of The Monkees achieved using Bootstrap media objects. There is also a contact form on the page that uses built in HTML5 validation to ensure correct imput of the Contact Name, Contact Email and Your Message fields. The form's submit button takes the user to action-page.html.

The finished book-us.html page differs from the wireframe in that the testimonials section was implemented in the finished product. This decision was taken during the consideration of additional user stories that took place after the project was being coded. It was felt that prospective clients of The Monkees would need to see some sort of marketing in order to increase the chances of them making a booking.
<a name="action"></a>
### action-page.html
This is a dummy action page which does not utilise any server-side functionality but simulates the process that the user would go through when they submit the contact form. This page consists of a "thank you" message.

No wireframe was created for this page due to its simple format making a wireframe unnecessary.
<a name="music"></a>
### music.html
This page acts as a hub for the music subpages. It comprises of the featured album cover image (also displayed on index.html) and album heading displayed at a prominent position towards the top of the page, along with other albums displayed three per row going down the page. This layout is responsive, and collapses to a one album per row stacked layout on smaller viewports. Each of the album images and headings is a link that takes the user through to the respective music subpage.

### Music Subpage
Each of the music subpages possesses the same layout. The first row consists of the album cover image and a release date along with a short album description. The second row consists of a spotify widget that enables the user to play the album in their browser. The responsive layout collapses on smaller screens, so that the album image, the description, and the spotify player are stacked on top of each other.

A slight deviation from the wireframes exist in that on the finished product the spotify widget is below the rest of the content, whereas in the wireframe it was positioned to the right of the album image and directly below the album description. This approach was adopted due to it being discovered during coding that the spotify widget does not adapt well to small sizes. In order for the widget to be large enough to function correctly it had to be positioned below the rest of the content.

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