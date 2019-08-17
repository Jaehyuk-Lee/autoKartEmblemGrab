// 앰블럼 자동 잡기
// 앰블럼이 나오는 시간이 달라지거나
// 앰블럼 부분 코드가 달라지면 작동하지 않을 수 있음.
var em1 = setInterval(()=>{
    emblemEventApply(document.querySelector('a[data-n1emblem]'));
    setTimeout(() => {
        layerClose('layerAlert');
    }, 10);
}, 33 * 1000);

function emblemEventApply(target) {

    if (!isEmblemEventApply) {
        isEmblemEventApply = true;
        $target = $(target);
        var n4GameRound = $target.attr("data-n4GameRound");
        var n1Emblem = $target.attr("data-n1Emblem");

        if (Number(n4GameRound) > 0 && Number(n1Emblem)) {

            $.ajax({
                type: "POST", url: "/League/2019/Season1/Ajax/AjaxMedia.aspx", contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                   , data: { strType: "EmblemEventApply", n4GameRound: n4GameRound, n1Emblem: n1Emblem, rd: Math.random() }
                   , dataType: 'json', cache: false, async: false,
                success: function (data) {

                    if (data != null && data != '' && data.n4Return != null) {

                        if (data.n4Return == 0) {
                            $(".emb_list p.state").html("<strong>" + $("p.emblem a").attr("data-strEmblem") + " 엠블럼</strong>을 획득했습니다!");
                            $(".emb_list .emblem-num li").eq(Number(n1Emblem) - 1).addClass("emb_get");
                            $(".emb_list .emblem-num").show();
                            isEmblemEventList = false;
                            emblemHide();
                        } else {
                            if (data.n4Return == -801) eval(data.strReturnValue);
                            else if (data.strReturnValue != "") simpleLayerOpenMsg(0, data.strReturnValue);
                            else simpleLayerOpenMsg(0, "이벤트 참여 도중 오류가 발생하였습니다. <br>잠시 후 다시 시도 해주세요.");
                        }

                    }

                    isEmblemEventApply = false;

                },
                error: function (xhr, status, exception) { isEmblemEventApply = false; }
            });
        } else {
            simpleLayerOpenMsg(0, "이벤트 참여 도중 오류가 발생하였습니다. <br>잠시 후 다시 시도 해주세요.");
            isEmblemEventApply = false;
        }
    } else {
        simpleLayerOpenMsg(0, "이벤트에 참여중입니다. 잠시만 기다려주세요.");
    }
}

$.ajax({
    type: "POST", url: "/League/2019/Season1/Ajax/AjaxMedia.aspx", contentType: "application/x-www-form-urlencoded; charset=UTF-8"
       , data: { strType: "EmblemEventApply", n4GameRound: n4GameRound, n1Emblem: n1Emblem, rd: Math.random() }
       , dataType: 'json', cache: false, async: false,
    success: function (data) {

        if (data != null && data != '' && data.n4Return != null) {

            if (data.n4Return == 0) {
                $(".emb_list p.state").html("<strong>" + $("p.emblem a").attr("data-strEmblem") + " 엠블럼</strong>을 획득했습니다!");
                $(".emb_list .emblem-num li").eq(Number(n1Emblem) - 1).addClass("emb_get");
                $(".emb_list .emblem-num").show();
                isEmblemEventList = false;
                emblemHide();
            } else {
                if (data.n4Return == -801) eval(data.strReturnValue);
                else if (data.strReturnValue != "") simpleLayerOpenMsg(0, data.strReturnValue);
                else simpleLayerOpenMsg(0, "이벤트 참여 도중 오류가 발생하였습니다. <br>잠시 후 다시 시도 해주세요.");
            }

        }

        isEmblemEventApply = false;

    },
    error: function (xhr, status, exception) { isEmblemEventApply = false; }
});