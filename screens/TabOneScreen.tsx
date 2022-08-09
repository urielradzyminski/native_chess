import { color } from '@rneui/base';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const numbers = [1,2,3,4,5,6,7,8]
const boardSize = 400

enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  King,
  Queen
}

enum PlayerColor {
  Black,
  White
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View
        style={{
          height: boardSize,
          width: boardSize,
          backgroundColor: 'red'
        }}
      >
        {numbers.map( row => {
          return <BoardRow rowNumber={row} />
        })}

      </View>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

function BoardRow({rowNumber}:{rowNumber:number}){
  return <View style={{
    flexDirection: 'row'
  }}>
    {numbers.map(columnNumber => {
      return <BoardSquare row={rowNumber} column={columnNumber} piece={{
        type: PieceType.Knight,
        color: PlayerColor.Black
    }} />
    })}
  </View>
}

function BoardSquare({row, column, piece}:{row:number, column: number, piece: null|{
  type: PieceType,
  color: PlayerColor
}}){

  const pieceTypeMapping = {
    [PieceType.Pawn] : 'chess-pawn',
    [PieceType.Rook] : 'chess-rook',
    [PieceType.Knight] : 'chess-knight',
    [PieceType.Bishop] : 'chess-bishop',
    [PieceType.Queen] : 'chess-queen',
    [PieceType.King] : 'chess-king',
  }

  const pieceColorMapping = {
    [PlayerColor.Black]: 'darkgreen',
    [PlayerColor.White]: 'lightgreen',
  }
  const squareSize = boardSize/8
  const pieceSizeMultiplier = 0.70




  return <View
    style={{
      height: squareSize,
      width: squareSize,
      backgroundColor: ( (row+column) % 2 === 0 ? 'lightgray' : 'darkgray'),
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    {piece ? <FontAwesome5 size={squareSize*pieceSizeMultiplier} name={pieceTypeMapping[piece.type]} color={pieceColorMapping[piece.color]} /> : 'No'}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
