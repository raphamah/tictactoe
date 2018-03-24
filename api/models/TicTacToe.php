<?php

	class TicTacToe implements MoveInterface {
    	public function __construct(){

	    }
	    public function makeMove($boardState, $playerUnit = 'O')
	    {
	    	$randomx = rand(0,2);
	    	$randomy = rand(0,2);
	    	while($boardState[$randomx][$randomy] != '')
	    	{
	    		$randomx = rand(0,2);
	    		$randomy = rand(0,2);
	    	}
	    	
			return [$randomx,$randomy,$playerUnit];
	    }
	    public function possibleMovements($board)
	    {
	    	//test if its possible to do a movement in board
	    	$movementfree = false;
			for($i=0;$i<3;$i++)
			{
				for($j=0;$j<3;$j++)
				{
					if($board[$i][$j] == '')
					{
						$movementfree = true;
					}
				}
			}
			return $movementfree;
	    }
	}
?>