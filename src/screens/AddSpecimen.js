import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import CameraComponent from '../components/CameraComponent';
import SelectDropdown from 'react-native-select-dropdown';
import { Feather } from '@expo/vector-icons';

const AddSpecimen = () => {
  const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const [inputs, setInputs] = useState([{ id: 1, carga: "", photo: null, dropdownValue: null, number: "" }]);
  const [inputCount, setInputCount] = useState(1);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentInputId, setCurrentInputId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [inputToRemove, setInputToRemove] = useState(null);

  const addInput = () => {
    const newInputCount = inputs.length + 1;
    const newInput = { id: newInputCount, carga: "", photo: null, dropdownValue: null, number: "" };
    setInputs([...inputs, newInput]);
    setInputCount(newInputCount);
  };

  const handleCargaChange = (carga, id) => {
    const updatedInputs = inputs.map(input => {
      if (input.id === id) {
        return { ...input, carga };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const handleDropdownChange = (value, id) => {
    const updatedInputs = inputs.map(input => {
      if (input.id === id) {
        return { ...input, dropdownValue: value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const handleEspessuraChange = (number, id) => {
    const updatedInputs = inputs.map(input => {
      if (input.id === id) {
        return { ...input, number };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const removeInput = id => {
    setInputToRemove(id);
    setShowConfirmationModal(true);
  };

  const confirmRemoveInput = () => {
    const updatedInputs = inputs.filter(input => input.id !== inputToRemove);
    setInputs(updatedInputs);
    setInputCount(inputCount - 1);
    updateInputIds(updatedInputs);
    setShowConfirmationModal(false);
  };

  const cancelRemoveInput = () => {
    setShowConfirmationModal(false);
  };

  const updateInputIds = updatedInputs => {
    const newInputs = updatedInputs.map((input, index) => {
      return { ...input, id: index + 1 };
    });
    setInputs(newInputs);
  };

  const openCameraModal = id => {
    setCurrentInputId(id);
    setShowCameraModal(true);
  };

  const closeCameraModal = () => {
    setShowCameraModal(false);
  };

  const handlePhotoCapture = photo => {
    const updatedInputs = inputs.map(input => {
      if (input.id === currentInputId) {
        return { ...input, photo: photo.uri };
      }
      return input;
    });
    setInputs(updatedInputs);
    setShowCameraModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>    Carga</Text>
        <Text style={styles.title}>Tipo</Text>
        <Text style={styles.title}>Espessura </Text>
        <Text style={styles.title}></Text>
      </View>

      {inputs.map(input => (
        <View key={input.id} style={styles.inputContainer}>
          <Text>{input.id}:</Text>
          <TextInput
            style={styles.input}
            textAlign='center'
            placeholder="MPa"
            value={input.carga}
            onChangeText={carga => handleCargaChange(carga, input.id)}
            keyboardType="numeric"
            autoFocus={input.id === inputCount}
          />

          <SelectDropdown
            data={options}
            defaultValue=""
            onSelect={value => handleDropdownChange(value, input.id)}
            buttonTextAfterSelection={selectedItem => selectedItem}
            rowTextForSelection={item => item}
            buttonStyle={styles.dropdownButton}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.dropdownRow}
            textStyle={styles.dropdownText}
            dropdownIconPosition="right"
            dropdownIcon={<Feather name="chevron-down" size={24} color="gray" />}
          />

          <TextInput
            style={styles.numericInput}
            textAlign='center'
            placeholder="mm"
            value={input.number}
            onChangeText={number => handleEspessuraChange(number, input.id)}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => openCameraModal(input.id)}
          >
            <Text style={styles.cameraButtonText}>
              <Feather name="camera" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeInput(input.id)}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
             <Button title="Add Input" onPress={addInput} />

      {/* Seção de pré-visualização */}
      <View>
        {inputs.map(input => (
          <View key={input.id} style={styles.previewContainer}>
            <Text style={styles.previewText}>CP {input.id}: Carga: {input.carga} MPa</Text>
            
            {input.dropdownValue && (
              <Text style={styles.previewDropdownValue}>Tipo: {input.dropdownValue}</Text>
            )}
            {input.number && (
              <Text style={styles.previewNumber}>Espessura: {input.number}  </Text>
            )}
            {input.photo && (
              <Image source={{ uri: input.photo }} style={styles.previewImage} />
            )}
          </View>
        ))}
      </View>

      <Modal
        visible={showCameraModal}
        animationType="slide"
        onRequestClose={closeCameraModal}
      >
        <CameraComponent onPhotoCapture={handlePhotoCapture} onClose={closeCameraModal} />
      </Modal>

      <Modal visible={showConfirmationModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja remover o input?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={cancelRemoveInput}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={confirmRemoveInput}>
                <Text style={styles.modalButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 10,
  },
  dropdownButton: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dropdown: {
    flex: 1,
    marginTop: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  dropdownRow: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  numericInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 10,
  },
  cameraButton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    margin: 5,
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewText: {
    marginRight: 10,
  },
  previewDropdownValue: {
    marginLeft: 10,
    fontStyle: 'italic',
    color: 'gray',
  },
  previewNumber: {
    marginLeft: 10,
    color: 'gray',
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  modalButtonCancel: {
    backgroundColor: 'gray',
  },
  modalButtonConfirm: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddSpecimen;