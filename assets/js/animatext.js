/*!
 * animatext v1
 * by E-magineurs
 *
 */

// Uses Node, AMD or browser globals to create a module.

function throttle(fn, wait) {

    var time = Date.now();
    return function () {

        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.animatext = factory(root.jQuery);
    }
}(this, function ($) {

    'use strict';

    function animatext(options) {
        this.init();

        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);

    }
    animatext.defaults = {
        elements: '.slider'
    }
    animatext.prototype.option = function (options) {
        $.extend(this.options, options);
        //console.log(this.options);
    }
    animatext.prototype.init = function () {
        var self = this;

        $(document).ready(function () {
            self.build();
        });

    }


    /***************************
    
    Initialisation
    
    ***************************/

    animatext.prototype.build = function () {
        let self = this;

        

        this.$elements = $(self.options.element);
        let uniqueId = 0;
        this.$elements.each(function(){
            self.createContext($(this), uniqueId);
            uniqueId = uniqueId+1;
        })
        
        this.$isChromium = window.chrome,
            this.$vendorName = window.navigator.vendor,
            this.$isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
            this.$isChrome = false;
        if (this.$isChromium !== null && this.$isChromium !== undefined && this.$vendorName === "Google Inc." && this.$isOpera == false) {
             
            this.$isChrome = true;
        }

        

    }
    
    animatext.prototype.createContext = function (elem, uniqueId) {
        console.log($(this));
        
        elem.css('display', 'none').wrap('<div class="anim-cont" />');
        
        let elemSize = elem.css('fontSize');
        let elemSpacing = elem.css('letterSpacing');
        let elemColor = elem.css('color');
        let elemWeight = elem.css('fontWeight');
        let elemAlign = elem.css('text-align');
        let elemLine = elem.css('line-height');        
        let elemFamily = elem.css('fontFamily');
        let elemTransform = elem.css('textTransform');
        
        let elemMargin = elem.css('margin');
        
        let style = '<style id="anima'+uniqueId+'">.anim-text-'+uniqueId+'{ margin:'+elemMargin+'; text-align:'+elemAlign+'; line-height:'+elemLine+';} .animatext-'+uniqueId+'{ font-size:'+elemSize+';  letter-spacing:'+elemSpacing+'; color:'+elemColor+'; font-weight:'+elemWeight+'; font-family:'+elemFamily+'; text-transform:'+elemTransform+'; }</style>';
        $('body').prepend(style);
        
        let elemParent = elem.parent();        
        let texts = elem.text().split(' ');
        let textCont = $('<div class="anim-text anim-text-'+uniqueId+'" />');
        elemParent.append(textCont);
        
        let j = 0; 

        for(let i = 0; i < texts.length; i++){
            let text = texts[i];
            let wrapText = $('<span class="anim-elem animatext-'+uniqueId+'" />').attr('data-delay',j+1);
            wrapText.text(text + '\xa0'); 
            j=j+0.1;
            elemParent.children('.anim-text').append(wrapText);

        }

        elemParent.find('.anim-elem').each(function(){

                
                gsap.to($(this), 0.5, {
                   translateY: '0%',
                   delay : $(this).attr('data-delay'),
                   opacity:1

                })


            })


    }

    

   
    return animatext;
}));
