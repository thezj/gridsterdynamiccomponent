var app = new Vue({
    el: '#app',
    data: {
        griddataset: null,
    },
    components: {
        component1: {
            data() {
                return {
                    name: 'comp1'
                }
            },
            mounted() {
                setTimeout(i => {
                    this.name = 'im COMP1'
                }, 2000)
            },
            template: '<div>{{name}}</div>'
        },
        component2: {
            data() {
                return {
                    name: 'comp2'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component3: {
            data() {
                return {
                    name: 'comp3'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component4: {
            data() {
                return {
                    name: 'comp4'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component5: {
            data() {
                return {
                    name: 'comp5'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component6: {
            data() {
                return {
                    name: 'comp6'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component7: {
            data() {
                return {
                    name: 'comp7'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component8: {
            data() {
                return {
                    name: 'comp8'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component9: {
            data() {
                return {
                    name: 'comp9'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component10: {
            data() {
                return {
                    name: 'comp10'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component11: {
            data() {
                return {
                    name: 'comp11'
                }
            },
            template: '<div>{{name}}</div>'
        },
        component12: {
            data() {
                return {
                    name: 'comp12'
                }
            },
            template: '<div>{{name}}</div>'
        },
        extracom: {
            data() {
                return {
                    name: 'extracom'
                }
            },
            template: '<div>{{name}}</div>'
        },

    },
    mounted() {
        let griddataset = localStorage.getItem(`recentdata`);
        if (!griddataset) {
            this.griddataset = [{
                "col": 1,
                "row": 1,
                "size_x": 1,
                "size_y": 1,
                "equip": "component1"
            }, {
                "col": 1,
                "row": 2,
                "size_x": 1,
                "size_y": 1,
                "equip": "component2"
            }, {
                "col": 1,
                "row": 3,
                "size_x": 1,
                "size_y": 1,
                "equip": "component3"
            }, {
                "col": 2,
                "row": 1,
                "size_x": 2,
                "size_y": 1,
                "equip": "component4"
            }, {
                "col": 2,
                "row": 2,
                "size_x": 2,
                "size_y": 2,
                "equip": "component5"
            }, {
                "col": 4,
                "row": 1,
                "size_x": 1,
                "size_y": 1,
                "equip": "component6"
            }, {
                "col": 4,
                "row": 2,
                "size_x": 2,
                "size_y": 1,
                "equip": "component7"
            }, {
                "col": 4,
                "row": 3,
                "size_x": 1,
                "size_y": 1,
                "equip": "component8"
            }, {
                "col": 5,
                "row": 1,
                "size_x": 1,
                "size_y": 1,
                "equip": "component9"
            }, {
                "col": 4,
                "row": 4,
                "size_x": 1,
                "size_y": 1,
                "equip": "component10"
            }, {
                "col": 6,
                "row": 1,
                "size_x": 1,
                "size_y": 1,
                "equip": "component11"
            }, {
                "col": 6,
                "row": 2,
                "size_x": 1,
                "size_y": 2,
                "equip": "component12"
            }]
            localStorage.setItem(`recentdata`, JSON.stringify(this.griddataset));
        } else {
            this.griddataset = JSON.parse(griddataset)
        }


        this.refreshwidget()



    },
    methods: {
        //刷新gridster
        refreshwidget() {
            let vm = this

            //初始化gridster
            $(function () {

                //初始化gridster
                window.gridster = $('.gridster ul').gridster({
                    shift_widgets_up: false,
                    shift_larger_widgets_down: false,
                    max_cols: 6, //最多能创建多少列
                    widget_base_dimensions: ['auto', 140], //Base widget dimensions in pixels. The first index is the width, the second is the height.
                    resize: {
                        enabled: false //Set to true to enable drag-and-drop widget resizing. This setting doesn't affect to the resize_widget method.
                    },
                    serialize_params: function ($w, wgd) {
                        return {
                            col: wgd.col,
                            row: wgd.row,
                            size_x: wgd.size_x,
                            size_y: wgd.size_y,
                            equip: wgd.el[0].dataset.equip
                        }
                    },
                    draggable: {
                        stop(e, ui) {
                            savegrid()
                        }
                    }
                }).data('gridster')

                

                //删除widget
                $(document).on("dblclick", '.gridster li', function () {
                    gridster.remove_widget(this, c => {
                        savegrid()
                    });
                })

                //保存序列化的grid
                let savegrid = function () {
                    let s = gridster.serialize()
                    console.log(JSON.stringify(s))
                    localStorage.setItem(`recentdata`, JSON.stringify(s));
                }

                savegrid()

            })
        },
        //添加widget
        addwidget() {
            let x = 0
            this.griddataset.map(i => {
                x < i.row + i.size_y ? x = i.row + i.size_y : null
            })

            this.griddataset.push({
                "col": 1,
                "row": 1,
                "size_x": 3,
                "size_y": 2,
                "equip": "extracom"
            })

            

            window.gridster.destroy()
            this.refreshwidget()
        }
    }
})