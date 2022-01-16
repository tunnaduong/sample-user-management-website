<?php
class jsonOBJ
{
    private $_arr;
    private $_arrName;

    function __construct($arrName)
    {
        $this->_arrName = $arrName;
        $this->_arr[$this->_arrName] = array();
    }

    function toArray()
    {
        return $this->_arr;
    }
    function toString()
    {
        return json_encode($this->_arr);
    }

    function push($newObjectElement)
    {
        $this->_arr[$this->_arrName][] = $newObjectElement; // array[$key]=$val;
    }

    function add($key, $val)
    {
        $this->_arr[$this->_arrName][] = array($key => $val);
    }
}