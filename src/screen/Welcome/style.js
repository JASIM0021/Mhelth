import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
flex:1,
alignItems:'center',
justifyContent:'center',
paddingHorizontal:10
    },
    image:{
        height:200,
        width:'100%',
        borderRadius:25,
        elevation:10
    },
    btn:{
        marginTop:50,
        width:'80%',
        height:50,
        backgroundColor:'blue',
        borderRadius:10,
        elevation:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontWeight:'bold'
    }
})

export default styles