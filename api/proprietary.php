<?php 
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $status = isset($_POST["status"]) ? $_POST["status"] : "";
    $goodsId = isset($_POST["goodsId"]) ? $_POST["goodsId"] : "";
    $name = isset($_POST["name"]) ? $_POST["name"] : "";
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $price = isset($_POST["price"]) ? $_POST["price"] : "";
    $saleQty = isset($_POST["saleQty"]) ? $_POST["saleQty"] : "";
    $keepNum = isset($_POST["keepNum"]) ? $_POST["keepNum"] : "";
    $birth = isset($_POST["birth"]) ? $_POST["birth"] : "";
    $keepDate = isset($_POST["keepDate"]) ? $_POST["keepDate"] : "";
    $page = isset($_POST["page"]) ? $_POST["page"] : 1;
    $limit = isset($_POST["limit"]) ? $_POST["limit"] : 8;
    if($status=="add" && $goodsId){
        $sql = "select * from proprietary where goodsId='$goodsId'";
        $result = query($sql);
        if(count($result) > 0){
            echo "fail";  
        }else{
            if($keepDate != ""){
                $sql = "insert into proprietary(goodsId,name,type,price,saleQty,keepNum,birth,keepDate)values('$goodsId','$name','$type','$price','$saleQty','$keepNum','$birth','$keepDate')";
            }else{
                $sql = "insert into proprietary(goodsId,name,type,price,saleQty,keepNum,birth)values('$goodsId','$name','$type','$price','$saleQty','$keepNum','$birth')";         
            }
            $res = excute_oop($sql);
            if($res =="true"){
                echo "ok";
            }else{
                echo "fail";
            }
        }
    }else if($status=="del" && $goodsId){
        $sql = "select * from proprietary where goodsId='$goodsId'";
        $result = query($sql);
        if(count($result) == 0){
            echo "fail";
        }else{
            $sql = "delete from proprietary where goodsId=$goodsId";
            $sql.= ";delete from allImg where goodsId=$goodsId";
            $res = multi_query_oop($sql);
            $endRes = 'fail';
            foreach ($res as $key => $value) {  
                if(count($value) == 0){
                    $endRes = 'ok';
                }
            }  
            echo $endRes;
        }
    }else if($status=="upd" && $goodsId){
        $sql = "select * from proprietary where goodsId='$goodsId'";
        $result = query($sql);
        if(count($result) == 0){
            echo "fail";
        }else{
            $sql = "update proprietary set";
            if($name){
                $sql.= " name='$name'";
            }
            if($type){
                $sql.= ",type='$type'";
            }
            if($price){
                $sql.= ",price='$price'";
            }
            if($saleQty){
                $sql.= ",saleQty='$saleQty'";
            }
            if($keepNum){
                $sql.= ",keepNum='$keepNum'";
            }
            if($birth){
                $sql.= ",birth='$birth'";
            }
            if($keepDate){
                $sql.= ",keepDate='$keepDate'";
            }
            $sql.= " where goodsId='$goodsId'";
            // if($goodsImg){
            //     $sql.= ";update allImg set goodsImg='$goodsImg' where goodsId=$goodsId";
            // }
            $res = excute_oop($sql);
            // $endRes = 'fail';
            // foreach ($res as $key => $value) {  
            //     if(count($value) == 0){
            //         $endRes = 'ok';
            //     }
            // }  
            if($res=="1"){
                echo 'ok';
            }else{
                echo 'fail';
            }
        }
    }else if($status=="get"){
        $sql = "select * from allImg join proprietary on proprietary.goodsId=allImg.goodsId";
        if($goodsId){
            $sql.=" where proprietary.goodsId=$goodsId";
        }
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo "fail";
        }
    }else if($status=="page"){
        $sql = "select SQL_CALC_FOUND_ROWS * from proprietary where 1=1 limit ";
        $sql .= ($page - 1)*$limit;
        $sql .= ', ';
        $sql .= $limit;
        $sql .= ';select FOUND_ROWS() as rowsCount;';
        $result = multi_query_oop($sql);
        if(count($result) == 0){
            echo "fail";
        }else{
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }
?>