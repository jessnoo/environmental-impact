﻿/*global define,dojo,dojoConfig,esri,alert,selectedBasemap */
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
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "dojo/text!./templates/baseMapGalleryTemplate.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/OpenStreetMapLayer",
    "dojo/topic",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/ImageParameters",
    "esri/layers/ImageServiceParameters"
], function (declare, domConstruct, array, lang, on, dom, query, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ArcGISTiledMapServiceLayer, OpenStreetMapLayer, topic, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer, ImageParameters, ImageServiceParameters) {

    //========================================================================================================================//

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        enableToggling: true,
        /**
        * create baseMapGallery widget
        *
        * @class
        * @name widgets/baseMapGallery/baseMapGallery
        */
        postCreate: function () {

            topic.subscribe("setBaseMap", lang.hitch(this, function (preLayerIndex, selectedBaseMapIndex, presentThumbNail) {
                var thumbnailPath;
                dojo.selectedBasemapIndex = selectedBaseMapIndex;
                this._changeBaseMap(preLayerIndex, presentThumbNail);
                if (dojo.configData.BaseMapLayers[presentThumbNail].length) {
                    thumbnailPath = dojo.configData.BaseMapLayers[presentThumbNail][0].ThumbnailSource;
                } else {
                    thumbnailPath = dojo.configData.BaseMapLayers[presentThumbNail].ThumbnailSource;
                }
                query('.basemapThumbnail')[0].src = thumbnailPath;
            }));

            if (dojo.configData.BaseMapLayers) {
                dom.byId("esriCTParentDivContainer").appendChild(this.esriCTDivLayerContainer);
                this.layerList.appendChild(this._createBaseMapElement());
                this._loadSharedBasemap();
            }
        },

        /**
        * create UI for basemap toggle widget
        * @memberOf widgets/baseMapGallery/baseMapGallery
        */
        _createBaseMapElement: function () {
            var divContainer, imgThumbnail, thumbnailPath, basemap;
            if (dojo.selectedBasemapIndex === dojo.configData.BaseMapLayers.length - 1) {
                basemap = dojo.configData.BaseMapLayers[0];
            } else {
                basemap = dojo.configData.BaseMapLayers[dojo.selectedBasemapIndex + 1];
            }

            if (basemap.length) {
                thumbnailPath = basemap[0].ThumbnailSource;
            } else {
                thumbnailPath = basemap.ThumbnailSource;
            }
            divContainer = domConstruct.create("div", { "class": "esriCTbaseMapContainerNode" });
            imgThumbnail = domConstruct.create("img", { "class": "basemapThumbnail", "src": thumbnailPath }, null);
            on(imgThumbnail, "click", lang.hitch(this, function () {
                if (this.enableToggling) {
                    dojo.selectedBasemapIndex++;
                    this._changeBasemapThumbnail();
                }
            }));
            divContainer.appendChild(imgThumbnail);
            return divContainer;
        },

        /**
        * change basemap layer
        * @memberOf widgets/baseMapGallery/baseMapGallery
        */
        _changeBaseMap: function (preLayerIndex, presentThumbNail) {
            topic.publish("baseMapIndex", preLayerIndex, dojo.selectedBasemapIndex, presentThumbNail);
            var basemap, basemapLayers, basemapLayerId = "defaultBasemap";
            basemapLayers = dojo.configData.BaseMapLayers[preLayerIndex];
            this.enableToggling = false;
            this.map.onLayerRemove = lang.hitch(this, function (layer) {
                if (this.enableToggling) {
                    this._addBasemapLayerOnMap(basemapLayerId);
                }
            });

            if (basemapLayers.length) {
                array.forEach(basemapLayers, lang.hitch(this, function (layer, index) {
                    basemap = this.map.getLayer(basemapLayerId + index);
                    if (basemapLayers.length - 1 === index) {
                        this.enableToggling = true;
                    }
                    if (basemap) {
                        this.map.removeLayer(basemap);
                    }
                }));
            } else {
                basemap = this.map.getLayer(basemapLayerId);
                if (basemap) {
                    this.enableToggling = true;
                    this.map.removeLayer(basemap);
                }
            }
        },

        /**
        * get shared basemap
        * @memberOf widgets/baseMapGallery/baseMapGallery
        */
        _addBasemapLayerOnMap: function (basemapLayerId) {
            var layer, basemapLayers = dojo.configData.BaseMapLayers[dojo.selectedBasemapIndex];

            this.map.onLayerAdd = lang.hitch(this, function (layer) {
                this.enableToggling = true;
            });
            if (basemapLayers.length) {
                array.forEach(basemapLayers, lang.hitch(this, function (basemap, index) {
                    this.enableToggling = false;
                    layer = new ArcGISTiledMapServiceLayer(basemap.MapURL, { id: basemapLayerId + index, visible: true });
                    this.map.addLayer(layer, index);
                }));
            } else {
                this.enableToggling = false;
                if (basemapLayers.layerType === "OpenStreetMap") {
                    layer = new OpenStreetMapLayer({ id: basemapLayerId, visible: true });
                } else if (basemapLayers.layerType === "ArcGISMapServiceLayer") {
                    imageParameters = new ImageParameters();
                    layer = new ArcGISDynamicMapServiceLayer(basemapLayers.MapURL, {
                        "imageParameters": imageParameters,
                        id: basemapLayerId
                    });
                } else if (basemapLayers.layerType === "ArcGISImageServiceLayer") {
                    params = new ImageServiceParameters();
                    layer = new ArcGISImageServiceLayer(basemapLayers.MapURL, {
                        imageServiceParameters: params,
                        id: basemapLayerId,
                        opacity: 0.75
                    });
                } else {
                    layer = new ArcGISTiledMapServiceLayer(basemapLayers.MapURL, { id: basemapLayerId, visible: true });
                }
                this.map.addLayer(layer, 0);
            }
        },

        /**
        * get shared basemap
        * @memberOf widgets/baseMapGallery/baseMapGallery
        */
        _loadSharedBasemap: function () {
            if (window.location.toString().split("$selectedBasemapIndex=").length > 1) {
                var preLayerIndex = dojo.selectedBasemapIndex;
                dojo.selectedBasemapIndex = parseInt(window.location.toString().split("$selectedBasemapIndex=")[1].split("$")[0], 10);
                this._changeBasemapThumbnail(preLayerIndex);
            }
        },

        /**
        * change basemap thumbnail
        * @memberOf widgets/baseMapGallery/baseMapGallery
        */
        _changeBasemapThumbnail: function (preIndex) {
            var baseMapURLCount, presentThumbNail, preLayerIndex, thumbnailPath;
            baseMapURLCount = dojo.configData.BaseMapLayers.length;
            preLayerIndex = dojo.selectedBasemapIndex - 1;
            if (dojo.selectedBasemapIndex === baseMapURLCount) {
                dojo.selectedBasemapIndex = 0;
            }
            if (dojo.selectedBasemapIndex === 0) {
                preLayerIndex = baseMapURLCount - 1;
            }
            presentThumbNail = dojo.selectedBasemapIndex + 1;
            if (dojo.selectedBasemapIndex === baseMapURLCount - 1) {
                presentThumbNail = 0;
            }
            if (preIndex) {
                preLayerIndex = preIndex;
            }
            this._changeBaseMap(preLayerIndex, presentThumbNail);
            if (dojo.configData.BaseMapLayers[presentThumbNail].length) {
                thumbnailPath = dojo.configData.BaseMapLayers[presentThumbNail][0].ThumbnailSource;
            } else {
                thumbnailPath = dojo.configData.BaseMapLayers[presentThumbNail].ThumbnailSource;

            }
            query('.basemapThumbnail')[0].src = thumbnailPath;
        }
    });
});
