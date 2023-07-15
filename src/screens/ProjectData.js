import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const options = [
  'NBR 13528-1:2019 - Paredes de argamassas inorgânicas',
  'NBR 13749:2013 - Paredes e tetos de argamassas inorgânicas',
  'NBR 13753:1996 - Piso interno ou externo com placas cerâmicas e com utilização de argamassa colante',
  'NBR 13754:1996 - Paredes internas com placas cerâmicas e com utilização de argamassa colante',
  'NBR 13755:2017 - Cerâmico de fachadas e paredes externas com utilização de argamassa colante'
];

const ProjectData = () => {
  const [clientName, setClientName] = useState("");
  const [work, setWork] = useState("");
  const [constructionCompany, setConstructionCompany] = useState("");
  const [address, setAddress] = useState("");
  const [norma, setNorma] = useState("");

  return (
    <View style={styles.container}>
        <Text>Cliente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Client"
        value={clientName}
        onChangeText={text => setClientName(text)}
      />
        <Text>Obra:</Text>
      <TextInput
        style={styles.input}
        placeholder="Worksite"
        value={work}
        onChangeText={text => setWork(text)}
      />
        <Text>Construtora:</Text>
      <TextInput
        style={styles.input}
        placeholder="Construction Company"
        value={constructionCompany}
        onChangeText={text => setConstructionCompany(text)}
      />
        <Text>Endereço:</Text>
      <TextInput
        style={styles.input}
        placeholder="Adress"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.nbr}>
      <Text>Norma(s) de referência: </Text>
      <SelectDropdown
        data={options}
        defaultValue=""
        onSelect={value => setNorma(value)}
        buttonTextAfterSelection={selectedItem => selectedItem}
        rowTextForSelection={item => item}
        buttonStyle={styles.dropdownButton}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        textStyle={styles.dropdownText}
        dropdownIconPosition="right"
      />
      </View>
       {/* Seção de visualização */}
       <View style={styles.previewContainer}>
        <Text style={styles.previewText}>Cliente: {clientName}</Text>
        <Text style={styles.previewText}>Obra: {work}</Text>
        <Text style={styles.previewText}>Construtora: {constructionCompany}</Text>
        <Text style={styles.previewText}>Endereço: {address}</Text>
        <Text style={styles.previewText}>Norma(s) de referência: {norma}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dropdownButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    width: 370,
    marginLeft: -160
  },
  dropdownRow: {
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  nbr: {
    flexDirection: 'row',
    alignContent: 'center'
  }
});

export default ProjectData;