<?php
    include 'DBHelper.php';
    // 升降序
    $state = isset($_POST["state"]) ? $_POST["state"] : "";
    // 排序字段
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    // 狗分类
    $classify = isset($_POST["classify"]) ? $_POST["classify"] : "";
    // 操作
    $status = isset($_POST['status']) ? $_POST['status'] : "";
    
    // 给某一分类进行排序
    if($classify != "" && $state != "" && $type != ""){
        // $sql = "select * from pet where classify = '$classify' order by $type $state";
        $sql = "select allimg.goodsImg,pet.*,`user`.address,`user`.username from pet inner join allimg on allimg.goodsId = pet.goodsId inner join `user` on `user`.phoneNum = pet.phoneNum WHERE pet.classify = '$classify' order by $type $state";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }else if($state != "" && $type != ""){
        // 根据字段升降序
        // $sql = "select * from pet order by $type $state";
        $sql = "select allimg.goodsImg,pet.*,`user`.address,`user`.username from pet inner join allimg on allimg.goodsId = pet.goodsId inner join `user` on `user`.phoneNum = pet.phoneNum order by $type $state";

        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }else if($classify != ""){
        // 狗分类查询
        // $sql = "select * from pet where classify = '$classify'";
        $sql = "select allimg.goodsImg,pet.*,`user`.address,`user`.username from pet inner join allimg on allimg.goodsId = pet.goodsId inner join `user` on `user`.phoneNum = pet.phoneNum WHERE pet.classify = '$classify'";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }else{
        // 全部数据查询语句
        // $sql = "select * from pet";
        $sql = "select allimg.goodsImg,pet.*,`user`.address,`user`.username from pet inner join allimg on allimg.goodsId = pet.goodsId inner join `user` on `user`.phoneNum = pet.phoneNum";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }

    // 后台查询语句
    // 增加
    // if($status == "add"){

    // }


?>