angular.module('app', [])
   .controller('tictactoeController', ['$scope','$http', function($scope, $http){

  $scope.board = [
    [ { value: '-' }, { value: '-' }, { value: '-' } ],
    [ { value: '-' }, { value: '-' }, { value: '-' } ],
    [ { value: '-' }, { value: '-' }, { value: '-' } ]
  ];
  $scope.winner = '';
  $scope.end = false;
  $scope.currentPlayer = 'X';
  $scope.numberplay = 0;
  $scope.reset = function() {
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<3;j++)
      {
        $scope.board[i][j].value = '-';
      }
    }
    $scope.currentPlayer = 'X';
    $scope.winner = '';
    $scope.end = false;
    $scope.numberplay = 0;
  };
  var customAPIMove = function() {
    var array1 = [['','',''],['','',''],['','','']];
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<3;j++)
      {
        array1[i][j] = $scope.board[i][j].value == '-' ? '' : $scope.board[i][j].value;
      }
    }
    $http({
        method : "POST",
        url : "api/controller/movements.php",
        data : {
          'board' : array1,
          'playerUnit' : 'O'
        },
        dataType: 'json',
    }).then(function mySuccess(response) {

        var positionx = parseInt(response.data.data[0]);
        var positiony = parseInt(response.data.data[1]);
        $scope.board[positionx][positiony].value = response.data.data[2];
        
        $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
        $scope.numberplay++;
        checkForEndOfGame();

    }, function myError(response) {
        
    });
  };
  $scope.isTaken = function(cell) {
    return cell.value !== '-';
  };
  
  var checkForMatch = function(cell1, cell2, cell3) {
    return cell1 === cell2 && 
           cell1 === cell3 &&
           cell1 !== '-';
  };
  
  var checkForEndOfGame = function() {
    var wingame = '';
    // row match
    for(var i=0;i<3;i++)
    {
      wingame = checkForMatch($scope.board[i][0].value,$scope.board[i][1].value,$scope.board[i][2].value) ? $scope.board[i][2].value : wingame;
    }
    // column match
    for(var i=0;i<3;i++)
    {
      wingame = checkForMatch($scope.board[0][i].value,$scope.board[1][i].value,$scope.board[2][i].value) ? $scope.board[2][i].value : wingame;
    }
    // diagonal match
    wingame = checkForMatch($scope.board[0][0].value,$scope.board[1][1].value,$scope.board[2][2].value) ? $scope.board[2][2].value : wingame;
    wingame = checkForMatch($scope.board[2][0].value,$scope.board[1][1].value,$scope.board[0][2].value) ? $scope.board[2][0].value : wingame;

    if(wingame == 'O' || wingame == 'X')
    {
      $scope.winner = wingame;
      $scope.end = true;
    }
    else if($scope.numberplay == 9)
    {
      $scope.end = true;
      $scope.winner = '';
    }
    else
    {
      $scope.end = false;
      $scope.winner = '';
    }
    
    return $scope.end;
  };
  
  $scope.move = function(cell) {
    
    if (checkForEndOfGame() == false) {

      if($scope.numberplay % 2 == 0)
      {
        cell.value = $scope.currentPlayer;
        $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
        $scope.numberplay++;
        if (checkForEndOfGame() == false) {
          customAPIMove();
        }
      }
      
    }
  };
  
}]
);
 