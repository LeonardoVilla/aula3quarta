import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useCallback, useState } from "react";
//npm install react-native-toast-message
import { useFocusRefresh } from "@/hooks/use-focus-refresh";
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Alterar() {

    const [nomeAluno, setNomeAluno] = useState('')
    const [idadeAluno, setIdadeAluno] = useState('')
    const [emailAluno, setEmailAluno] = useState('')
    
    const [loading, setLoading] = useState(false)

    const { id } = useLocalSearchParams();
    const idParam = Array.isArray(id) ? id[0] : id;
    const alunoId = Number(idParam);
    const hasValidId = Number.isFinite(alunoId) && alunoId > 0;

    const carregarAlunos = useCallback(async () => {
        if (!hasValidId) {
            return;
        }

        const { data, error } = await supabase
            .from("tb_aluno")
            .select()
            .eq('id', alunoId)
            .single()
        
        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Aluno não encontrado.'+ error.message,
            })
        }else{
            setNomeAluno(data.nome ? data.nome : '');
            setIdadeAluno(data.idade ?? '');
            setEmailAluno(data.email ?? '');
        }
    }, [alunoId, hasValidId]);

    useFocusRefresh(carregarAlunos);

    async function atualizarAluno() {
        if (!hasValidId) {
            Toast.show({
                type: 'error',
                text1: 'ID inválido',
                text2: 'Selecione um aluno na tela de consulta para alterar.',
            })
            return;
        }

        setLoading(true)
        const { data, error } = await supabase
            .from('tb_aluno')
            .update([
                {
                    nome: nomeAluno, 
                    idade: idadeAluno, 
                    email: emailAluno
                },
            ])
            .eq('id', alunoId)
            .select()

        if(error){
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Aluno não foi atualizado!',
                text2: error.message
            })
        }else{
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: `Aluno ${data?.[0]?.nome} Atualizado com sucesso!`
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}><Ionicons name="create-outline" size={22} color="#ffffff" /> Atualização de Aluno </Text>

            <TextInput
                style={styles.Input}
                placeholder="Informe seu nome"
                value={nomeAluno}
                onChangeText={setNomeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe sua idade"
                value={idadeAluno}
                onChangeText={setIdadeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe seu e-mail"
                value={emailAluno}
                onChangeText={setEmailAluno}
            />

            <Toast />

            <TouchableOpacity style={styles.Button} onPress={atualizarAluno} disabled={loading}>
                <Text style={styles.ButtonText}><Ionicons name="save-outline" size={20} color="#0f172a" /> Alterar Aluno</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    Text: {
        fontSize: 24, color: '#ffffff',
        marginBottom: 20,
    },
    Input: {
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        color: '#000000'
    },
    Button: {
        width: '100%',
        height: 40,
        backgroundColor: '#c2e015',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: 20,
        color: '#0f172a',
        fontWeight: '700',
    },
})