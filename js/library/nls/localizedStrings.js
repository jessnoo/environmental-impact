﻿/*global define */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
/*
 | Copyright 2013 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
    root: {
        showNullValue: "N/A",
        buttons: {
            okButtonText: "OK",
            link: "Link",
            email: "Email",  // Shown next to icon for sharing the current map extents via email; works with shareViaEmail tooltip
            facebook: "Facebook",  // Shown next to icon for sharing the current map extents via a Facebook post; works with shareViaFacebook tooltip
            twitter: "Twitter",  // Shown next to icon for sharing the current map extents via a Twitter tweet; works with shareViaTwitter tooltip
            embedding: "Embedded URL",
            go: "Go",
            browse: "Browse",
            upload: "Upload",
            add: "Add",
            locate: "Locate ",
            downLoad: "Download"
        },
        tooltips: {
            search: "Search",
            reports: "Reports",
            locate: "Locate",
            share: "Share",
            help: "Help",
            clearEntry: "Clear",
            selectInitialCoordinates: "Select Initial Coordinates",
            loadingText: "Loading...",
            settingsIconTitle: "Choose fields to view in summary report"
        },
        titles: {
            areaOfInterestTabText: "Area of Interest",
            reportTabText: "Report",
            webpageDisplayText: "Copy/Paste HTML into your web page",
            pointToolText: "Point",
            multipointToolText: "Multipoint",
            lineToolText: "Line",
            rectangleToolText: "Rectangle",
            polygonToolText: "Polygon",
            selectFeatureText: "Select features",
            areaStandardUnit: "Acres",
            areaMetricUnit: "Sq.Km.",
            lineMetricdUnit: "Km",
            lineStandardUnit: "Miles",
            lineMetricUnit: "Kilometer",
            standardUnitLabel: "Standard Units",
            metricUnitLabel: "Show areas in ",
            unitLabel: "Metric Units",
            uploadShapeFile: "Upload Shapefile to include in analysis",
            drawAOIBeforeUpload: "(Please draw an AOI before uploading)",
            downLoadReport: "Download Report",
            data: "Data",
            selectFormat: "Select Format",
            pdfReport: "PDF Report",
            quickSummary: "Quick Summary",
            deatiledSummary: "Detailed Summary",
            drawingToolUnifiedSearchTitle: "Navigate to geography",
            placeNameTtile: "Placename",
            drawingTitle: "Draw",
            uploadShapefileTitle: "Shapefile",
            coordinatesTitle: "Coordinates",
            distanceLabel: "Distance",
            bearingLabel: "Bearing"
        },
        messages: {
            legendLoadingText: "Loading...",
            sliderDisplayText: "Show results within ",
            aoiOptionsText: "Define AOI by using",
            uploadShapefileText: "Upload a zipped shapefile to define your AOI",
            coordinatesText: "Enter coordinates, bearing and distance",
            drawToolsText: "Use the Drawing tools to define your AOI",
            bufferSliderText: "Buffer distance (Optional for polygon AOIs)",
            placeNameSearchText: "Use an address to define your AOI",
            radioBtnMiles: "Miles",
            radioBtnFeet: "Feet",
            radioBtnMeters: "Meters",
            radioBtnKilometers: "Kilometers",
            bearingContainerTitle: "Bearing and Distance",
            bearingContainerText: "Define Start point using address search",
            startPoint: "Click on map to select start point",
            orText: "OR",
            latitude: "Latitude",
            longitude: "Longitude",
            bearing: "Bearing",
            bearingValue: "(0-360)",
            distance: "Distance",
            reportPanelHeader: "Summary Report for Area of Interest",
            selectReportFields: "Select report fields"
        },
        errorMessages: {
            invalidSearch: "No results found",
            falseConfigParams: "Required configuration key values are either null or not exactly matching with layer attributes. This message may appear multiple times.",
            invalidLocation: "Current location not found.",
            invalidProjection: "Unable to plot current location on the map.",
            widgetNotLoaded: "Unable to load widgets.",
            shareFailed: "Unable to share.",
            emptyInfoWindowTitle: "No feature details",
            emptyInfoWindowContent: "InfoWindow is disabled for the selected layer in webmap.",
            bufferSliderValue: "Buffer slider should not be set to zero distance",
            addLatitudeValue: "Please enter valid Latitude",
            addLongitudeValue: "Please enter valid Longitude.",
            addBearingValue: "Please specify bearing values between 0 to 360 degrees",
            addDistanceMiles: "Please add valid distance in ${0}.",
            distanceMaxLimit: "Please specify distance between 0 to ${0}.",
            errorPerfomingQuery: "Error performing query operation",
            esriJobFailMessage: "Failed to generate AOI from shapefile",
            esriJobFailToAnlayse: "Failed to execute (AnalyseShapefile)",
            defineAOI: "Please define AOI to generate the report.",
            invalidGeometry: "Invalid geometry.",
            noFeaturesFound: "Features not found.",
            browseFile: "Please browse a file.",
            noFeaturesInAOI: "No features found in AOI.",
            noFieldsSelected: "No fields selected."
        },
        // End of shared nls

        //App nls
        appErrorMessage: {
            layerTitleError: "Title and/or QueryLayerId parameters in SearchSettings do not match with configured operational layers.",
            titleNotMatching: "Title and/or QueryLayerId parameters in the InfoWindowSettings and SearchSettings do not match.",
            lengthDoNotMatch: "The number of objects in InfoWindowSettings and SearchSettings do not match.",
            webmapTitleError: "Title and/or QueryLayerId parameters in SearchSettings do not match with configured webmap"
        }
        //End of App nls
    },
    es: true,
    fr: true,
    it: true
});
