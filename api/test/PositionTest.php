<?php
require './vendor/autoload.php';
include 'interfaces/MoveInterface.php';
include 'models/TicTacToe.php';

class PositionTest extends PHPUnit_Framework_TestCase
{
    public $TicTacToe;
    
    
    public function testpossibles()
    {
    	$this->TicTacToe = new TicTacToe;
    	$res = $this->TicTacToe->possibleMovements([['X','O','X'],['X','O','X'],['O','O','X']]);
    	$this->assertEquals(false, $res, 'Error to analyse possible movements');

    	$res = $this->TicTacToe->possibleMovements([['X','O',''],['X','O','X'],['O','O','X']]);
    	$this->assertEquals(true, $res, 'Error to analyse possible movements');
    }
    
    public function testmakeMove()
    {
    	
    	$this->TicTacToe = new TicTacToe;

    	$board = [['X','X',''],['','',''],['O','O','X']];
    	$res = $this->MakeMoveAux($board,'O');


        $board = [['','',''],['','',''],['','','']];
        $res = $this->MakeMoveAux($board,'X');
    }
    protected function MakeMoveAux($board,$type)
    {
    	$res = $this->TicTacToe->makeMove($board, $type);
    	$this->assertInternalType('array',$res);
        $this->assertEquals(3,count($res));
        $this->assertEquals($type, $res[2]);
        $this->assertInternalType('int',$res[0]);
        $this->assertInternalType('int',$res[1]);
    }
  
}