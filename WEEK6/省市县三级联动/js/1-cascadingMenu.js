$(function () {
    var $province = $('#province'),
        $city = $('#city'),
        $county = $('#county');
    var regionData = null;

    //=>解析数据
    //->level:级别(0-省 1-市 2-县)
    //->value:如果level=1,value传递的是选中省的内容...
    function formatData(level, value) {
        var result = [],
            data = null;
        if (level === 0) {
            $(regionData).each(function (index, item) {
                result.push(item.name);
            });
        }
        if (level === 1) {
            $(regionData).filter(function (index, item) {
                if (item.name === value) {
                    data = item;
                    return false;
                }
            });
            if (data) {
                $(data['city']).each(function (index, item) {
                    result.push(item.name);
                });
            }
        }
        if (level === 2) {
            $(regionData).filter(function (index, item) {
                $(item['city']).filter(function (ind, ite) {
                    if (ite.name === value) {
                        data = ite;
                        return false;
                    }
                });
                return false;
            });
            if (data) {
                $(data['area']).each(function (index, item) {
                    result.push(item);
                });
            }
        }
        return result;
    }

    //=>绑定数据
    //->data:需要绑定的数据
    function bindData(data) {
        var result = '';
        $.each(data, function (index, item) {
            result += '<option value="' + item + '">' + item + '</option>';
        });
        return result;
    }

    //=>清除下拉框数据
    //->flag:标识(0-清空省 1-清空市 2-清空县 不传-都清空)
    function clear(flag) {
        var clearStr = '<option value="">请选择</option>';
        switch (flag) {
            case 0:
                $province.html(clearStr);
                break;
            case 1:
                $city.html(clearStr);
                break;
            case 2:
                $county.html(clearStr);
                break;
            default:
                $province.html(clearStr);
                $city.html(clearStr);
                $county.html(clearStr);
        }
    }


    //=>获取数据
    $.ajax({
        url: 'json/regionData.json',
        method: 'get',
        dataType: 'json',
        cache: false,
        success: function (result) {
            regionData = result;

            //->绑定省的数据
            var data = formatData(0),
                provinceResult = bindData(data);
            $province.append(provinceResult);

            //->省切换的时候绑定市的数据
            $province.change(function () {
                clear(1);
                clear(2);
                var value = $(this).val(),
                    cityResult = bindData(formatData(1, value));
                $city.append(cityResult);
            });

            //->市切换的时候绑定县的数据
            $city.change(function () {
                clear(2);
                var value = $(this).val(),
                    countyResult = bindData(formatData(2, value));
                $county.append(countyResult);
            });
        }
    });
});