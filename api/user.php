<?php
    include 'DBHelper.php';
    $phoneNum = isset($_POST['phoneNum']) ? $_POST['phoneNum'] : "";
    $username = isset($_POST['username']) ? $_POST['username'] : "";
    $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : "";
    $iden = isset($_POST['iden']) ? $_POST['iden'] : "";
    $idenImg = isset($_POST['idenImg']) ? $_POST['idenImg'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $address = isset($_POST['address']) ? $_POST['address'] : "";
    $headImg = isset($_POST['headImg']) ? $_POST['headImg'] : "";
    // 增=>add,删=>del,查=>get,改=>upd
    $status = isset($_POST['status']) ? $_POST['status'] : "";
    // state=1 表示浏览历史，state=2 表示收藏
    $state = isset($_POST['state']) ? $_POST['state'] : "";
    $goodsId = isset($_POST['goodsId']) ? $_POST['goodsId'] : "";

    if($status == "get" && $phoneNum != ""){
        // 查询
        $sql = "select * from user where phoneNum = '$phoneNum'";
        $result = query_oop($sql);
        
        // 过滤密码
        foreach ($result[0] as $key=>$value) {  
            if ($key == "password"){
                unset($result[0][$key]);
            }
        } 
        
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }else if($iden){
        // 用户认证
        $sql = "insert into user (iden,username,idenImg) values ('$iden','$username','$idenImg')";
        $result = excute_oop($sql);
        if($result){
            echo "ture";
        }else{
            // 表示失败
            echo 'false';
        }
    }else if($status == "upd" && $phoneNum != ""){
        // 更新
        $sql = "update user set";
        if($username){
            $sql .= " phoneNum = '$phoneNum'";
        }else if($phoneNum){
            $sql .= " ,username = '$username'";
        }else if($address){
            $sql .= " ,address = '$address'";
        }else if($headImg){
            $sql .= " ,headImg = '$headImg'";
        }else if($nickname){
            $sql .= " ,nickname = '$nickname'";
        }
        $sql .= " where phoneNum = '$phoneNum'";
        $result = excute_oop($sql);
        if($result){
            echo "ture";
        }else{
            // 表示失败
            echo 'false';
        }
    }else if(($state == "1" || $state == "2") && $status == "add"){
        $sql = "select * from history_collect where phoneNumId = '$phoneNum' and goodsId = '$goodsId' and status = '$state'";
        $result = query_oop($sql);
        if($result){
            echo "ok";
        }else{
            // 添加收藏和浏览足迹
            $sql1 = "insert into history_collect (phoneNumId,goodsId,status) values ('$phoneNum','$goodsId','$state')";
            $result1 = excute_oop($sql1);
            if($result1){
                echo "ok";
            }else{
                // 表示数据不存在
                echo 'false';
            }
            
        }
    }else if($state == "2" && $status == "del" && $goodsId != "" && $phoneNum != ""){
        // 取消收藏
        $sql = "delete from history_collect where status='$state' and phoneNumId = '$phoneNum' and goodsId='$goodsId'";
        $result = excute_oop($sql);
        if($result){
            echo "ture";
        }else{
            // 表示失败
            echo 'false';
        }
    }else if($state == "1" || $state == "2"){
        
        // 查询收藏与浏览记录
        $sql = "select h.phoneNumId,pet.* from `history_collect` as h inner join user on user.phoneNum = h.phoneNumId inner join pet on pet.goodsId = h.goodsId WHERE h.`status` = '$state'";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            // 表示数据不存在
            echo 'false';
        }
    }

?>