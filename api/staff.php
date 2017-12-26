<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*'); 
    $username = isset($_POST['username']) ? $_POST['username'] : "";
    $password = isset($_POST['password']) ? $_POST['password'] : "";
    $position = isset($_POST['position']) ? $_POST['position'] : "";
    $status = isset($_POST['status']) ? $_POST['status'] : "";
    $id = isset($_POST['id']) ? $_POST['id'] : "";
    $page = isset($_POST["page"]) ? $_POST["page"] : 1;
    $limit = isset($_POST["limit"]) ? $_POST["limit"] : 8;
    if($status == "add"){
        $sql = "insert into staff (username,password,position) values ('$username','$password','$position')";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo "ok";
        }else{
            echo 'false';
        }
    }else if($status == "upd"){
        $sql = "update staff set username = '$username',position = '$position' where id = '$id'";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo "ok";
        }else{
            echo 'false';
        }
    }else if($status == "del"){
        $sql = "delete from staff where id = '$id'";
        $result = excute_oop($sql);
        // 输出结果
        if($result){
            echo "ok";
        }else{
            echo 'false';
        }
    }else if($status == "get"){
        $sql = "select * from staff where id = '$id'";
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
        if($result){
            if($result[0]['position'] == "管理员"){
                echo '管理员';
            }else if($result[0]['position'] == "员工"){
                echo '员工';
            }
        }else{
            echo 'fail';
        }
    }else if($status=="page"){
        $sql = "select SQL_CALC_FOUND_ROWS * from staff where 1=1 limit ";
        $sql .= ($page - 1)*$limit;
        $sql .= ', ';
        $sql .= $limit;
        $sql .= ';select FOUND_ROWS() as rowsCount;';
        $result = multi_query_oop($sql);
        $result['data1'][0]['password']='***';
        if(count($result) == 0){
            echo "fail";
        }else{
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }


?>