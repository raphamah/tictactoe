<?php
	header('Content-Type: text/html; charset=UTF-8');

	include '../interfaces/MoveInterface.php';
    include '../models/TicTacToe.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	if(!isset($request->board) && sizeof($request->board) != 9)
	{
		//error request input incorrect
		http_response_code(400);
        exit();
	}

	$tictactoe = new TicTacToe();
	if(!$tictactoe->possibleMovements($request->board))
	{
		//computer doesnt have free movements
		http_response_code(400);
        exit();
	}
	//get the next movement
	$response = $tictactoe->makeMove($request->board,$request->playerUnit);

	http_response_code(200);
    echo json_encode(["data" => $response], JSON_UNESCAPED_SLASHES);
?>