<?php
    include 'DBHelper.php';
    $username = isset($_GET['username']) ? $_GET['username'] : "";
    $password = isset($_GET['password']) ? $_GET['password'] : "";
    $position = isset($_GET['position']) ? $_GET['position'] : "";
    $status = isset($_GET['status']) ? $_GET['status'] : "";

    if($status == "add"){
        $sql = "insert into staff (username,password,position) values ('$username','$password','$position')";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo 'true';
        }else{
            echo 'false';
        }
    }else if($status == "upd"){
        $sql = "update staff set position = '$position' where usename = '$usename'";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo 'true';
        }else{
            echo 'false';
        }
    }else if($status == "del"){
        $sql = "delete from staff where usename = '$usename'";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo 'true';
        }else{
            echo 'false';
        }
    }else if($status == "get"){
        $sql = "select * from staff where usename like '%$username%'";
        $result = query_oop($sql);
        // 输出结果
        if($result){
           echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'false';
        }
    }else if($username != "" && $password != ""){
        $sql = "select * from staff where username = '$username' and password = '$password'";
        
        $result = query_oop($sql);
        // var_dump($result);
        // 输出结果
        if($result[0]['position'] == "管理员"){
            echo '管理员';
        }else if($result[0]['position'] == "员工"){
            echo '员工';
        }else{
            echo 'false';
        }
    }


?>