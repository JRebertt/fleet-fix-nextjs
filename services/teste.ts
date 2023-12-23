import { app } from '../db/firebase/config' // Ajuste o caminho conforme necessário
import { collection, addDoc, getDocs } from 'firebase/firestore'

// Função para testar a adição de um documento
async function testAddDocument() {
  try {
    const docRef = await addDoc(collection(firestore, 'testCollection'), {
      testField: 'Test Value',
    })
    console.log('Documento escrito com ID: ', docRef.id)
  } catch (e) {
    console.error('Erro ao adicionar documento: ', e)
  }
}

// Função para testar a leitura de documentos
async function testReadDocuments() {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'testCollection'))
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
    })
  } catch (e) {
    console.error('Erro ao ler documentos: ', e)
  }
}

// Chame as funções de teste
testAddDocument()
testReadDocuments()
