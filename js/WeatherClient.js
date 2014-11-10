(function(window, undefined) {
        "use strict";

        var Task = Backbone.Model.extend({

        });
        var t1 = new Task({});
        console.log(t1);

        var WeatherView = Backbone.View.extend({
            tagName: "div",
            className: "weather",
            initialize: function(opts) {
                // 1. Sometimes it will be instantiated without options, so to guard against errors:
                this.options = _.extend({}, {
                        $container: $('body')
                    },
                    opts
                );
                // 2. Part of putting a view into its initial state is to put its element
                //    into the DOM. Its container should be configurable using an option
                //    so that a) it can be used anywhere in the app and b) it can be
                //    easily unit tested.
                this.options.$container.append(this.el);

                // 3. Render the content of the view
                this.render();
            },
            template: "<h1>{feelslike_f}</h1>",
            render: function() {
                this.el.innerHTML = _.template(this.template, this.options);
            }
        });

        // WeatherClient.prototype.testInputs = function() {
        //     "use strict";
        //     var input = {};
        //     var inputs = $(':input');

        //     var nothingIsEmpty = Array.prototype.slice.call(inputs).reduce(function(nothingEmpty, currentPointer) {
        //         return nothingEmpty && !!currentPointer.value;
        //     }, true);


        //     if (!nothingIsEmpty) {
        //         window.location.replace("#/")
        //         return true;
        //     } else {
        //         return false;
        //     }
        // };

        WeatherClient.prototype.createInputObject = function() {
            var input = {};
            var inputs = $(':input');

            $(':input').each(function() {
                input[this.name] = this.value;
            });

            console.dir(input);
            return input;
        };

        function WeatherClient(options) {
            this.options = _.extend({}, options, {
                keyid: "6b18e3006f0c1e2b"
            });

            this.init();
        }

        WeatherClient.prototype.queryAPI = function() {
            var input = this.createInputObject();

            var url = [
                "/wunderground/api/", input.state, input.city
                //this.options.keyid,
                //"/forecast/geolookup/conditions/q/",
                //"TX",
                //"/",
                //"Houston",
                //".json"
            ];
            console.log(url);
            return $.get(url.join('')).then(function() {
                //console.log(url);
                //console.log(arguments[0].current_observation);
                console.log(arguments[0].current_observation);
                return arguments[0].current_observation;
            });
        };

        // WeatherClient.prototype.makeWeatherUndergroundRequest = function(x) {
        //     $.when(
        //         this.queryAPI()
        //     ).then(function() {
        //         //console.log(arguments[0]);
        //         arguments[0].forEach(function(data) {
        //             new WeatherView(data);
        //         })
        //     })
        // }

        WeatherClient.prototype.init = function() {
            // body...
            var self = this;

            $.when(
                self.queryAPI()
            ).then(function(args) {
                console.log(args);
                // self.makeWeatherUndergroundRequest(args);
                new WeatherView(args);
                // args.forEach(function(data){
                //  new WeatherView(data);
                // })
            });

        };
        $(document).ready(function() {

                $('#button').click(function(e) {
                    var inputvalue = $("#input").val();
                    window.location.replace("http://api.wunderground.com/api/6b18e3006f0c1e2b/forecast/geolookup/conditions/q/" + input.state + "/" + input.city + ".json");
                });
            }

            window.WeatherClient = WeatherClient;
        })(window, undefined);
