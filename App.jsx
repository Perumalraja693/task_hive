import { SetStateAction, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Entypo'

function App() {

  const [tasks, setTasks] = useState([])


  const [inputTxt, setInputTxt] = useState("")

  const [editedTaskTextIndex, setEditedTaskTextIndex] = useState(-1)


  const handleInput = (text) => {
    setInputTxt(text)
  }

  const HandleAddTask = () => {
    if (tasks) {
      if (editedTaskTextIndex !== -1) {
        const updatedTasks = [...tasks]
        updatedTasks[editedTaskTextIndex] = inputTxt
        setTasks(updatedTasks)
        setEditedTaskTextIndex(-1)
        setInputTxt('')
      }
      else {
        setTasks([...tasks, inputTxt])
        setInputTxt('')
      }
    }
  }

  const handleEdit = (index) => {
    const editedTask = tasks[index]
    setInputTxt(editedTask)
    setEditedTaskTextIndex(index)


  }

  const handleDelete=(index)=>{
    const updatedDelTasks=[...tasks]
    updatedDelTasks.splice(index,1)
    setTasks(updatedDelTasks)

  }

  const handleTaskRender = ({ item, index }) => {
    return (
      <View style={style.taskDispView}>
        <Text style={{ width: '80%',fontFamily:'Poppins-SemiBold' ,}}>
          {
            item
          }
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { handleEdit(index) }}>
            <Icon name="edit" size={22} style={{ color: '#2191f4', paddingLeft: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ handleDelete(index)}}>
            <Icon name="delete" size={22} style={{ color: 'red', paddingLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    )

  }
  return (
    <SafeAreaView style={style.root}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Text style={style.titleTxt}>
        Task Hive
      </Text>
      <View style={style.taskListContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(index) => index}
          renderItem={handleTaskRender}
        />
      </View>
      <View style={style.inputContainer}>
        <TextInput style={style.txtInput} placeholder="Enter the task" placeholderTextColor={'#c4c4c4'} value={inputTxt} onChangeText={handleInput} />
        <TouchableOpacity style={style.icoView} onPress={HandleAddTask}>
          <Icon name='rightcircle' size={48} style={{ color: '#2191f4' }} />
        </TouchableOpacity>
      </View>


    </SafeAreaView>

  );
}


const style = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  titleTxt: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    marginVertical: 15,
    marginHorizontal: 10,


  },
  txtInput: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#c4c4c4",
    width: "85%",
    fontSize: 18,
    color: 'black',
    padding: 10,
    flexWrap: 'wrap',
    marginTop: 10,
    fontFamily:'Poppins-Medium'

  },
  inputContainer: {
    flexDirection: 'row',


  },
  icoView: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    marginTop: 15

  },
  taskListContainer: {
    height: '85%',
    flex: 10
  },

  taskDispView: {
    borderWidth: 3,
    borderColor: '#c4c4c4',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row'
  }
})


export default App;
