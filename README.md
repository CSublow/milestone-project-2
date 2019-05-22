# Milestone Project 2 - UK Road Transport Greenhouse Gas Emissions 1990-2016 Interactive Data Dashboard

## Table Of Contents

[1. Introduction](#introduction)

----------

[2. UX](#ux)

[2.1. Wireframes](#wireframes)

----------

[3. Features](#features)

[3.1. Loading System](#loading-system)

[3.2. No JavaScript Detection](#no-javascript-detection)

[3.3. Header](#header)

[3.4. Touchscreen Warning](#touchscreen-warning)

[3.5. Introductory Text and Highlights](#introductory-text-and-highlights)

[3.6. Main Content Overview](#main-content-overview)

[3.7. Responsiveness](#responsiveness)

[3.8. Select Boxes](#select-boxes)

[3.9. Dynamically Changing Text](#dynamically-changing-text)

[3.10. Colour Scheme](#colour-scheme)

[3.11. Line Chart](#line-chart)

[3.12. Composite Chart](#composite-chart)

[3.13. Pie Chart](#pie-chart)

[3.14. Bar Chart](#bar-chart)

[3.15. Features Left To Implement](#features-left-to-implement)

----------

[4. How Existing Features Fulfil User Requirements](#how-existing-features-fulfil-user-requirements)

----------

[5. Technologies Used](#technologies-used)

----------

[6. Testing](#Testing)

[6.1. Code Validation](#code-validation)

[6.2. Accessibility](#accessibility)

[6.3. User Stories Testing](#user-stories-testing)

[6.4. Browser and Responsiveness Testing](#browser-and-responsiveness-testing)

[6.5. Known Issues](#known-issues)

----------

[7. Deployment](#deployment)

----------

[8. Credits](#credits)

[8.1. Data](#data)

[8.2. Images](#images)

[8.3. Acknowledgements](#acknowledgements)

--------------------

## Introduction

This project is an SPA (single page application) interactive data dashboard. The dashboard visualises publicly available data on emissions from road transport within the UK between the years 1990 and 2016.

The dashboard primarily relies on [DC.js](https://dc-js.github.io/dc.js/), a JavaScript-based charting library. DC in turn relies on [Crossfilter](http://crossfilter.github.io/crossfilter/), a dataset explorer, and [D3.js](https://d3js.org/), which is utilised by DC in order to render charts in CSS-friendly SVG format.

## UX

The typical user of this application is likely to be someone interested in data visualisations, being a person with at least some knowledge of how to read charts. The subject (environmentalism) of the dashboard may also be of interest to the public, considering that environmental issues are often featured in the media. Most people are at least vaguely familiar with the greenhouse gas effect and the role that road transport has in emitting greenhouse gases.

Because of this potential broad user-base, it was decided to keep the dashboard relatively simple; in total, there are only 4 charts on the dashboard, not including a few dynamic and static number displays. This simplicity is hoped to reduce the chance of users experiencing information overload.

### Wireframes
Prior to work beginning on the app, wireframes were created to aid the design progress and provide direction during actual coding. These can be found in the "mockups" folder in the root directory of the project.

The wireframes served as the initial inspiration for the project, although the finished project diverges from them on several points. DC.js, Crossfilter and D3.js are versatile libraries, and this project was a learning exercise for me perhaps as much as it was an exercise in already acquired skills. Without a comprehensive knowledge of what the libraries at my disposal could do, I was unable to design to that effect. The differences between the wireframes and the finished project are detailed throughout this readme.

## Features
The website is an SPA data dashboard consisting of a single HTML page, utilising JavaScript to render the charts and jQuery for additional data rendering and DOM manipulation. Styling is achieved with CSS using SASS pre-processing with SCSS syntax. The data the app works with is in JSON format, the data in its raw form was taken from the [uk.gov website]( https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-national-statistics-1990-2016).

### Loading System
As the app was being developed, it was discovered that page loads looked untidy; content, especially charts, took much longer to load then other content even on relatively fast connections. It was decided to give the app a loading overlay which would cover the rest of the page whilst the main content is loaded. A plain green background is used, with a spinning graphic created purely with css borders and the text "Loading...". jQuery is used to detect when the page is fully loaded, and when this happens the loading overlay fades out and the main content comes into focus. 

A delay of one second is used to ensure that the loading overlay is visible for at the very least one second. This ensures that the user is always able to see what is happening; users on very fast connections or those who have cookies saved might become confused by a green overlay that flashes on and off very quickly.

The loading system was not envisioned to be necessary during the design phase, hence there is no wireframe for it

### No JavaScript Detection
Without JavaScript no charts can be rendered, and the dashboard is essentially useless. Users without JavaScript see a green overlay with the words "No JavaScript detected! Please enable JavaScript to view the dashboard". No other content is rendered bar the header, this is to help orientate users as to what webpage they are currently viewing 
The no-js functionality is accomplished through a class on the body element called 'no-js', in combination with a <noscript> element containing the no JavaScript content. If a page loads with JavaScript enabled, the no-js class is removed and the <noscript> element is ignored, allowing the rest of the content to load as intended. 
Although using both may seem overkill, a combination of a no-js class and a <noscript> element was necessary to implement due to an issue with the loading overlay, which would display instead of the <noscript> content if no JavaScript was detected.

The no JavaScript detection functionality was not considered needed during the design phase, so there is no wireframe for it.

### Header
At the top of the app there is a header that serves as the main heading for the page. Earlier on in the development process the header used to contain some aesthetical chart icons rendered using the [Font Awesome](https://fontawesome.com/) toolkit. These are not present in the wireframes and were simply added during development as I thought they complimented the design.

Although the icons were not nav links, during testing it was found that the icons could confuse users who mistook the icons for links. It was thus decided to remove these icons.

The header is styled with Bootstrap navbar classes. The header is not however a navbar in the conventional sense, since it doesn’t contain links to other pages due to the SPA nature of the app. Although specifying this element as a <header> or <nav> makes no difference to the average user, a user using assistive technologies may become confused when accessing a <nav> element containing no links, thus it was considered better from an accessibility point of view to specify this element as <header>

The current release of the app differs from the wireframes in that the current release features a subtitle of “Interactive Data Dashboard”. This was considered desirable as it helps user gauge the exact nature of the application they are viewing at a glance.

### Touchscreen Warning
Users accessing the app on a touchscreen-enabled device see an alert just below the header informing the user that the app is best viewed on a device with a mouse or trackpad. The ability to hover provided by a cursor is essential to the full experience of the dashboard, enabling tooltips with additional information to display on the charts when the user hovers over them. The alert thus serves as a notice to the user that their experience of the dashboard without a hover-enabled device will be sub-optimal. 

The alert only shows for media without hover by using a CSS media query. 

The alert utilises Bootstrap classes.

### Introductory Text and Highlights
Immediately below the header and alert, there are two sections rendered side by side using Bootstrap's grid system. The left section contains some aesthetical Font Awesome icons, in addition to some introductory text. 

Early on in development the introductory text contained its own heading, several paragraphs of text, as well as an image. However, it was decided that a heavy introductory section was unnecessary, took up too much screen real estate, and obstructed the main content of the app from coming into the user's focus quickly. It was therefore decided to make the introductory section as brief as possible in order to not distract users from the main content.

The Highlights section, located to the right of the introductory text, contains three number displays:

**Total Emissions Figure**

The figure representing the total emissions over the period is rendered using DC.js's numberDisplay class. The group used to render the figure sums all the numerical values with the key "Emissions" within the JSON data and returns this value.

**Average Emissions Figure**

Like the total emissions figure, the average emissions figure uses numberDisplay to generate a value. The value is calculated similarly to the total emissions figure by summing all the emissions values. This value is then divided by the number of years to come to an average.

This value is not rendered to the page using the numberDisplay class itself. Instead, the generated value is printed to the page using jQuery. This is because the numberDisplay generated value for the average figure changes when the user changes the select boxes found on the page, as the select boxes alter how the data is filtered. Since the average emissions figure is supposed to represent the average emissions for all the period and for all vehicle types, it does not make sense to have the average emissions figure dynamically change. jQuery was an easy workaround to this problem, as using jQuery takes the numberDisplay out of DC.js’s control.

**Most Polluting Year Figure**

The third Highlights figure represents the most polluting year on record. 

Unlike the other values, this figure is hardcoded into the HTML. Originally the figure was rendered to the page using jQuery in a similar way to the Average Emissions Figure, but it was noticed late on in the development process that the jQuery rendered value wasn’t actually working as intended, and was changing when the source select box was changed. It was not considered worth the time, considering a submission deadline approaching, to fix this issue using DC.js, especially considering that the value (the year 2007) does not actually need DC.js or Crossfilter once it has been rendered. To the end user it doesn’t actually matter how this figure is rendered, so long as the figure is accurate.

I intend to work on this issue in the future and ensure the Most Polluting Year Figure is generated using the underlying mechanics of DC.js, if for nothing else other than the learning opportunity.

It is still possible to see how I was rendering the Most Polluting Year Figure before, when it was rendered using DC.js and jQuery. The code has not been deleted and was just commented out.

**Deviations From Wireframes**

The introductory section involves some deviation from the wireframes. The wireframes suggest that the Highlights and introductory text are grouped together, and early on in development this was the case. However, the side by side layout was chosen to cut down on the viewport height utilised by the app, moving the main chart content up and allowing the user to notice it quicker.

In the wireframes there are two number displays (total emissions and average emissions). It was decided during development to increase this number to three to bulk up the Highlights section, as it looked overly sparse and detracted from the overall design of the app.

### Main Content Overview
The main content of the app consists of four charts divided into two sections. The **Total Emissions Over Time** section consists of a line chart and a multi-line composite chart. The **Total Emissions By Type Of Vehicle** section consists of a pie chart and a bar chart. 
In addition to the charts, each section contains a select box to enable manipulation of the charts; the select box is positioned just above the charts in each section. 
There are also a few bullet points of text in each section giving an overview of the data contained within the charts, as well as some dynamic text which alters depending on the current selection as determined by the select boxes.

There is some deviation from the wireframes in regards the select boxes. In the wireframes there are multiple select boxes, most of which are at the bottom of the app. This was changed mainly for 2 reasons.

1. The size the charts turned out to be rendered select boxes below them as bad UX; the user would not be aware the charts could be manipulated until they had scrolled down to below the charts.

2. As I was learning more about DC.js I realised the functionality I wanted to accomplish could be done easily with just two select boxes. It thus became unnecessary to add more.

### Responsiveness
Although the project brief does not indicate that the app must be fully responsive (in line with the lack of support for responsiveness in DC.js), it was felt that some degree of responsiveness was necessary. The charts are fairly large, with the default size of the line chart svg element for example being 700px by 700px. To have two charts side by side would therefore require at a minimum 1400px width of screen real estate. With a stacked design, the amount of viewport needed would reduce to a minimum of 700px.

It was decided to accommodate both a side-by-side and stacked design. Using Bootstrap's grid system, the charts are stacked up to and including 1199px viewport width. At 1200px and above, the charts in each section are aligned side by side.

To accomplish this responsiveness system, the chart sizes themselves had to be manipulated, since it should be noted that two 700px width charts on a 1200px width viewport would overlap. To counter this, the charts are set up to shrink to 600px width (500px for the pie chart which has a normal width of 600px) on viewport width sizes between and including 1181px and 1432px using a custom responsiveness function.

1181px was chosen for the lower breakpoint as opposed to the logical 1199px (i.e. the same as Bootstrap’s) as there was issues found during testing with Chrome on Windows, through interestingly not Chrome on Mac. The issue was that the charts would not ‘shrink’ once the 1200px breakpoint was reached, with the charts continuing to overlap until about the 1215px point was reached. To fix this, a lower breakpoint figure was added to give some margin, hopefully fixing the issue in all use cases. 

This responsiveness function is achieved with a combined jQuery/DC.js solution. The function has to be called in two situations; when the page is loaded to detect the viewport's size, and again if the user resizes the viewport when the app is already loaded. The function essentially works by passing in new arguments to the width methods of the chart objects, and then in the case of a window resize event, re-rendering the charts. In addition, charts which have legends also have new arguments passed into the size and positioning methods of the legend objects.

Using this responsiveness system gives the app the flexibility to be fully responsive down to 920px, with the ability to take advantage of extra screen real estate on larger viewports by having charts side by side where possible. On viewports smaller than 920px the user must rely on their viewport’s scroll and zoom functionality to make use of the app

### Select Boxes

The select boxes enable the full functionality of DC.js and Crossfilter by allowing the user to dynamically change the data displayed in the charts based on the criteria they select via the select boxes. There are in total two select boxes on the page, one above the charts in each section. 

For the **Total Emissions Over Time Section**, the select box is populated by a list of vehicles. For the **Total Emissions By Type Of Vehicle** section, the select box is populated by a list of years. Both select boxes contain as their default and unfiltered option an "All Vehicles" or "Whole Period" value respectively.

The select boxes are multiple; this allows the user to select multiple options, for example, viewing the emissions data for both petrol and diesel cars. If the user tries to include the default option in a multiple selection, only the default option will be selected; it doesn't make sense for the user to select "All Vehicles" along with petrol and diesel cars for example.

The select boxes include instructions; users are informed of the appropriate hotkeys to make multiple selections on both Windows and Mac platforms.

The select boxes can be reset via the reset buttons located directly below the dynamic text in each section. Each reset button only resets the charts within its own section. The reset button gives users an easy way to reset the charts.

Earlier on in development the project featured two duplicate select boxes in each section as opposed to just one; an additional one was added as a usability boost. This is because the charts take up a high proportion of screen real estate on all but the largest media, and it was felt that the app would become too cumbersome if the user had to scroll back to the top of a section to manipulate the data. Identical select boxes at both the top and bottom of sections would possibly help mitigate this issue.

However, issues discovered during testing made the duplicate select box idea cumbersome, and caused me to take the decision to scrap this idea and have just one select box in each section. These issues are detailed in the [Known Issues](#known-issues) section.

### Dynamically Changing Text
Below the selection boxes in both sections there is a small amount of text. This text essentially gives an overview of the data represented by the user’s selection, and changes depending on the current selection. The text is designed to be dynamic, and can represent both singular and multi selections

### Colour Scheme
The app utilises a spectrum of green colours, both within the charts themselves and also decoratively within the header and footer elements. Green was chosen as it suits the environmental theme of the app.

Where colour is used to indicate information (on the composite chart, pie chart and bar chart) the colours are kept consistent e.g. the colour used to represent petrol cars is the same light olive colour throughout the app. Using the same colours helps prevent user confusion, provide consistency in the design, and aid the user’s ability to digest the information at a glance.

### Line Chart
The line chart is the topmost chart when the layout is stacked, and the top-left chart when the layout is in columns. This chart represents emissions data over time, with the years on record on the x axis and emissions in kilotons on the y axis. 

The line represents the emissions data of either all vehicles, or a custom selection of vehicles as defined by the user. The chart is rendered using DC.js's lineChart class. If the user hovers over the line, they can see the exact figure in kilotons of the emissions for a given year.

The line chart within the wireframes is quite barebones; it was during development, where I was able to explore the capabilities of the DC.js library, that the finished look of the chart took effect. This can be said about all the charts within the app.

### Composite Chart
The composite chart is the second chart from the top when the layout is stacked, and the top-right chart when the layout is in columns. Similar to the line chart, this chart represents emissions data over time with the years on record on the x axis and the years on record on the y. Unlike the line chart, the composite chart allows a comparison of trends for different vehicles by rendering multiple lines at once, this being achieved with DC.js' compositeChart class. The user can select which lines they want to render using the select boxes.

The chart also contains a legend, with each vehicle type colour coded. If the user hovers over an item in the legend, the corresponding line on the chart becomes bolder, and the opacity of the other lines is reduced, allowing the user to easily see which item on the legend represents which line.

If the user hovers over a data point on a line, the tooltip displayed shows the vehicle type, year and emissions value for that particular data point.

### Pie Chart
The pie chart is the third chart from the top when the layout is stacked, and the bottom left chart when the layout is in columns. The pie chart allows a clearer visualisation of the proportion of emissions generated by each vehicle type. The pie chart can be filtered via the select box to show data for either the whole period, or one or more years.

The pie chart features a legend showing what vehicle type corresponds to what colour. Hovering over an item in the legend highlights the corresponding pie chart segment. The segment is also highlighted if the user directly hovers over it; additional information is displayed on hover in a tool tip, containing the vehicle type, emissions in kilotons, and the exact percentage figure represented by the segment.

The chart does not feature labels; the user must rely on the colour scheme, hover and highlight functionality to orientate themselves around the chart. Although labels could be easily included using DC.js, it was felt including labels would make the chart inconsistent; some of the pie chart’s slices are tiny, and even with external labels the user would not be able to clearly see which label corresponds to which slice. The pie chart is nevertheless included as it gives a good sense of the proportion difference in emissions between high polluters (e.g. petrol cars) and lesser polluters, such as buses and coaches.
### Bar Chart
The bar chart is the bottommost chart when stacked, and bottom-right when the layout is columnar. Vehicle type is shown on the x axis, with emissions in kilotons on the y axis. The bar chart provides users with an easy way to compare the relative sizes of emissions between vehicle types.

The bar chart uses the same filtering system as the pie chart, allowing users to compare data for the whole period, or a selection of years. 

The exact figure represented by the bars is shown as a number that sits directly on top of each bar. Users can also hover over the bars to gain this information.

The bar chart serves as a complimentary tool for the pie chart. Due to the exact emissions figures displayed above each bar, the user can clearly see all the data relating to all vehicle types, which is not the case with the pie chart due to limited space for labels for some vehicle types.

### Features Left to Implement
Some features are left open to the idea of implementation but were not featured in this release.

**Social share buttons **
All the major social networks provide the ability for developers to specify how they wish website pages to be shared, as well as the ability to implement specific social media sharing buttons on pages. This feature would be considered desirable for a future release, as it would expand the reach (and thus impact) of the dashboard.

The main reason for not implementing the share buttons for the first release is that the app will be initially hosted on GitHub Pages, which would not be considered desirable as the final URL for the project when hosted with the public in mind. Since the social networking buttons need the URL of the app, implementing them in the first release will require work in changing the URL to its final form when/if the buttons were implemented.

For this reason, social share buttons should be included in a later version of the app which is hosted elsewhere with an appropriate public-facing URL.

**“Further Reading” feature**
For the current release, the app is quite sparse in background information on some of the concepts covered (e.g. emissions, the greenhouse effect, air quality, transportation trends). It is envisioned that a future version of the app could have a dedicated section containing perhaps external resources where such information may be found by the user. It could also be envisioned that the app itself contains further reading, although this may be beyond the scope of an SPA and would require the design and implementation of a navigation system.

** More refined descriptive text **
In the current release, there is some dynamic descriptive text that changes depending on the user’s select box selections. In the ‘Total Emissions By Type OF Vehicle’ section, this text can become clunky if the user selects lots of options. For example, if the user selects ‘1990’, ‘1991’, ‘1992’, ‘1993’, ‘1994’ and ‘1995’, the descriptive text will read:

“There was a total of 672,638 kilotons of emissions in 1990, 1991, 1992, 1993, 1994, and 1995”

Listing years like this looks clunky. It is possible to do it another way, for example, making the above example read:

““There was a total of 672,638 kilotons of emissions in 1990 through to 1995”

However, this was deemed to be a fairly minor issue for the current release and not worth the time required to design and code an alternative solution, especially considering the almost limitless combinations of options the user could select.

## How Existing Features Fulfil User Requirements

It is hoped the app strikes a balance between a user with a strong interest in data visualisations and the general public. Users are able to view and interact with a selection of charts, and are provided with some brief explanatory text for what they are seeing.

Since the data being explored only contains 3 dimensions (i.e. year, vehicle type, and emissions figure), it is felt that having 4 charts is enough to explore all dimensions adequately, whilst not overloading the app with redundant visualisations.

The segmented design of the app (with each section containing a white background colour surrounded by a darker grey background) is in the same vein as many other data dashboards that can be found around the web (e.g. the [Klipfolio](https://www.klipfolio.com/sites/default/files/field/image/executive-dashboard.png), [Datapine](https://www.datapine.com/blog/wp-content/uploads/2017/08/Web-Analytics-Dashboard-datapine.png), and [Dashthis](https://static.dashthis.com/media/1960/dashboard_dashboard.png) styles). Using this conventional style is hoped to make the app familiar to users who have seen data dashboards before.

## Technologies Used
### HTML 5
The project's markup uses HTML5 and makes as much use of HTML5 semantics as possible using W3C standards.

### CSS 3
The markup is styled using CSS3.

### [SASS Pre-Processing](https://sass-lang.com/)
SASS pre-processing (using SCSS syntax) is used to render the project’s style.css file.

### [Bootstrap 4](https://getbootstrap.com/docs/3.3/)
The Bootstrap 4 framework is used to simplify the process of generating the website's structure, speed up its styling and ensuring its responsiveness.

### [Real Favicon Generator](https://realfavicongenerator.net/)
This tool was used to construct favicons for the project. How favicons are rendered is different depending on the browser or platform used, and this tool simplifies the process by providing the appropriate markup and icon for different platforms.

### JavaScript 
The app is heavily dependent on JavaScript, allowing the implementation of the loading system and providing the base for D3, Crossfilter and DC

### [jQuery 3.3.1](https://jquery.com)
jQuery is utilised by the project for a number of areas of functionality.

1. Bootstrap depends on jQuery for its JavaScript components
2. jQuery is used to implement the app’s loading system
3. Some of the custom chart functionality beyond what is immediately supplied by DC.js is accomplished with jQuery (e.g. the dynamic text changing based on the user’s selection)

### [D3.js](https://d3js.org/)
D3.js is a JavaScript library for manipulating documents based on data. D3.js is leveraged by DC.js.

### [Crossfilter](http://crossfilter.github.io/crossfilter/)
Crossfilter is a JavaScript library used for exploring datasets. Crossfilter is also leveraged by DC.js.

### [DC.js](https://dc-js.github.io/dc.js/)
DC.js is a JavaScript charting library based on D3.js and Crossfilter. DC.js is used to render the charts and number displays on the app, in addition to enabling their interactivity.

### [Font Awesome 5.3.1](https://fontawesome.com/)
The project uses Font Awesome to generate the icons found in the header and introductory text section.

### [Google Fonts](https://fonts.google.com/)
The project uses Google Fonts to increase the visual appeal of the project.

### [Image Resize Tool]( https://imageresize.org/)
Used to alter the dimensions of the header and footer image.

### [Browserling](https://www.browserling.com/internet-explorer-testing)
Used to test the app on IE9.

## Testing
### Code Validation
The W3C code validators for [HTML](https://validator.w3.org/) and [CSS](https://jigsaw.w3.org/css-validator/) were used to check markup validity. Both the index.html and style.css files pass these testors with no errors.

### Automated Testing
Automated testing was not used in this project; the vast majority of the JavaScript utilises DC.js and related libraries, and DC.js has a [history of being well-tested]( https://github.com/dc-js/dc.js/issues/392).

### User Stories Testing
Manual testing was conducted simulating the two types of users that have been previously identified in the [UX](#ux) section. The user categories defined are:

1.	General user
2.	Data-dashboard enthusiast

The results of these tests are as follows

**1. General User**

For this test I made use of another person (User X) who is without programming knowledge and who possesses an average knowledge of how webpages work.

The first thing this user did was go to the external link to the gov.uk website. After doing some reading there, they came back to the webpage, at first attempting to click the ‘back’ button on the browser. This did not work (the link opens in another tab). User X did however, after a few seconds, realise they were on another tab and come back to the webpage. I feel as though leaving the link opening in an external tab is the right decision, as this is the stronger convention with external links.

Next, User X began manipulating the select box. This was however without the charts actually in view. It took a moment for them to scroll down the webpage and manipulate the select boxes with the charts in view.

This led me to decide there may be a ‘screen real estate’ problem on my page. The introductory content perhaps takes up too much room, and there is too much margin between elements. To help resolve this issue, I took these steps after User X had finished testing:

1. Reducing both the page’s main heading and subheading by .5 rem when 1300px has been exceeded.

2. Reducing the spacing between sections (where the grey background is visible) by 10px

3. Reducing the margin property of the %force-center placeholder from 15px to 10px for the top and bottom margin. The %force-center placeholder is used throughout the app on multiple elements in order to structure the content.

These 3 steps helped condense the content somewhat, although the charts will still require the user to scroll down in order to come into focus on all but the largest viewports. It was decided to leave this issue there, since applying further fixes would require a redesign of the app, which was an undesirable step to take when in the testing phase.

Another issue found during User X’s testing was that the user had to ask what the ‘Reset Charts’ button does. I asked them to click the button, and once User X had clicked it the functionality became apparent.

This led me to consider adding instructions, either on the button itself, or through some text close by, that explains to users what the ‘Reset Charts’ button does. However, I felt that with the problem of screen real estate as already mentioned would render this impractical, and would clutter up the design of the app, potentially leading to the necessity of a redesign. Furthermore, the functionality of the button did become apparent to User X once they had clicked it, so I feel justified in leaving the Reset Charts button as part of the ‘learning curve’ of the app.

Other insights from User X’s testing was that the hover functionality works well and is apparent to the user. The user commented that they enjoyed the app and thought it was informative.

**2. Data Dashboard Enthusiast**

This was manual testing that I conducted myself, attempting to put myself into the shoes of someone who is interested in seeing data visualisations.

Upon loading the app I am drawn to the header which informs me as to what page I am viewing. Going down the page I see the source for the data is linked within the introductory text. Clicking this link takes me to the gov.uk website where I am able to get some background on the data. The app itself remains open in my browser as the gov.uk website loads in another tab.

Coming back to the app, I begin to manipulate the select box in the first section. I select both “Cars – Petrol” and “Cars – Diesel” and am able to see the charts adjust to my selection. The titles above the charts aid my ability to comprehend the data.

I then out of curiosity decide to see what happens if I also select “All Vehicles” along with “Cars- Petrol” and “Cars – Diesel”. The select box deselects the other options and only selects “All Vehicles”, this is intended functionality.

Scrolling down to the second section, I make a selection of all years in the 90’s decade. The charts adjust to fit my selection, along with the description text. I think the sentence reads awkwardly. How the sentence is rendered is something that would be addressed in a subsequent release of the app.

### Browser and Responsiveness Testing
The app was primarily developed on Google Chrome version 72.0.3626.121 on a Windows PC with a default maximised screen size of 1936px.

The app was not designed with smaller viewports in mind; DC.js charts lack a built-in responsiveness system. The app is however designed to go down to 920px, any user using a viewport less than that must depend on the scroll and zoom abilities of their browser. 

The upper limits of the app’s responsiveness exceed 3500px, with the app still looking presentable and usable at these higher ranges.

As detailed in the [Responsiveness](#responsiveness] section, some custom JavaScript was written to give the charts a basic degree of responsiveness. Without these scripts, supporting down to 920px would be impossible without jeopardising the design of the app on larger viewports, since the stacked chart design on smaller viewports does not look as good on larger viewports, nor does it follow conventional web design principles of taking up the available space.

In addition to Google Chrome's developer device simulator tool, an iPhone 7 running iOS v11.3 was used to test the app with its native Safari browser. The website was also tested on Firefox v65.0, Safari v11.0.2 (on a MacBook Pro 15-inch Retina) and Edge v42.17134.1.0.

There was no issues detected during the testing of the mentioned browsers, apart from a rather apparent issue with Edge, for which I am at a loss as to how to fix. This issue is detailed within the [Known Issues](#known-issues) section.

In addition to modern browser testing, the app was tested on IE version 11.0.9600.19130. On this browser, none of the charts were rendered. After some searching, I found that DC.js is tested in IE but that [issues with IE have been raised previously]https://stackoverflow.com/questions/50047687/dc-js-im-facing-issues-rendering-the-dc-js-dashboards-in-ie-11). Issues relating to DC.js working with IE [have been documented](https://github.com/dc-js/dc.js/issues/1334).

I also used a tool from [browserling](https://www.browserling.com/internet-explorer-testing) to test the app on IE9, to see if the issue was confined to IE11. The same issue occurs in IE9.

Due to IE being a legacy browser, and with Windows 10 (and Edge) becoming more and more common, I opted to not support IE in any of its incarnations. To this effect, a user trying to view the app on IE will see a page asking them to upgrade their browser.

### Known Issues

** Edge Browser Issue **

A known issue with the app is in relation to the Edge browser. The issue revolves around the select boxes, which would auto-scroll on other select boxes other than the one the user was currently manipulating. This issue, puzzlingly, was not present if the other select box had anything other than its default value selected; the issue was only apparent if the other select box was unchanged.

I believe this issue has something to do with the fact that Edge has all select boxes on the page contain a ‘highlighted’ option even if the user does not have a select box within focus. Other browsers do not have this, and on other browsers if the user clicks away from a select box the select box selection will become greyed out. However, this does not explain why the issue only occurred with default selections.

This was an annoying issue, since at one point the app featured 4 select boxes (2 identical ones in each section. The reason for having duplicate select boxes was to aid usability on smaller devices; the user would have multiple places where they could manipulate the charts.

In the end I decided to scrap this possible boost to usability by removing the duplicate select box in each section, not only because of the Edge issue, but also because of concerns about ‘screen real estate’ that I have detailed [elsewhere](#userstories). Through doing this, I was able to implement a rather scrappy solution in order to fix the issue with the two remaining select boxes on the page, which is to my mind not ideal but will have to make do for the first release, given limited time.

The fix involves setting a 1ms delay on scrolling the page back to the select box the user is currently manipulating using JavaScript’s scrollIntoView() method. This fix only fires for the Edge browser, so users on other browsers will experience the correct functionality.

The fix is not perfect, since there is still a brief moment where the user can see the page ‘jump around’. However, the user should not as easily become disorientated with this fix, and the fix is in my opinion the lesser of two evils. 

** No Print Support **

The app currently has no dedicated styles towards formatting the app’s layout if the user prints using browser print functionality. It was decided not to include any support for print, mainly because the app depends heavily on the user being able to interact with it through changing the select boxes and through hovering. It is not envisioned why a user would want to sacrifice this functionality in order to be able to print, especially because the app is fairly light in regards text; lots of text heavy content would make the app seem more likely to be print-worthy.

## Deployment
The project is deployed on GitHub Pages, available [here](https://dhamma1991.github.io/milestone-project-2/).

## Credits
### Data
The data the app is built on is available from:

https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-national-statistics-1990-2016

### Images
**Favicon**

https://www.kisspng.com/png-earth-drawing-cartoon-sketch-planet-cartoon-1506130/

**Header and Footer background image**

https://www.dealfuel.com/wp-content/uploads/2015/06/color5.png

### Acknowledgements
I received inspiration for this project from a number of data dashboards and articles around the web.

The white content area over grey background design was inspired by https://www.klipfolio.com/resources/articles/what-is-data-dashboard and https://www.datapine.com/blog/data-dashboards-definition-examples-templates/

The design decision to keep the dashboard relatively minimal was inspired by [this article]( https://stephanieevergreen.com/problem-with-dashboards/)

The decision to include number displays at the top of the app was inspired by the example from https://chartio.com/learn/marketing-analytics/how-to-create-a-marketing-leads-dashboard/

The inspiration to support lower width viewports came from the example on https://www.clicdata.com/solutions/data/tsheets/

**Code Acknowledgements**

Some coding elements of the project are based off pre-existing code found on the web.

Loading Screen Spinning Animation - https://ihatetomatoes.net/create-css3-spinning-preloader/

“Back to Top” Scrolling Function - https://www.w3schools.com/howto/howto_js_scroll_to_top.asp