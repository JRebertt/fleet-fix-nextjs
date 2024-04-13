// notifications.ts

const notifications = {
  maintenance: {
    schedule: {
      success:
        'Seu veículo está no nosso radar! Manutenção agendada com sucesso.',
      error:
        'Algum gremlin interferiu no agendamento. Por favor, tente novamente mais tarde.',
    },
    delete: {
      success:
        'Cancelamento confirmado. Seu veículo agradece o descanso extra!',
      error:
        'A tentativa de cancelamento esbarrou em um problema. Dê outra chance?',
    },
    start: {
      success: 'Rolando as mangas! A manutenção está a todo vapor.',
      error: 'Ops, algo travou antes mesmo de começar. Vamos investigar isso.',
    },
    completion: {
      success: 'Manutenção completa. Seu veículo está tinindo!',
      error:
        'A manutenção encontrou um obstáculo. Vamos precisar de um tempinho extra.',
    },
  },
  payment: {
    create: {
      success:
        'Pagamento registrado com sucesso. Tudo pronto para a próxima etapa!',
      error:
        'Não conseguimos registrar o pagamento. Por favor, verifique os detalhes e tente novamente.',
    },
    delete: {
      success:
        'Pagamento cancelado. Se precisar, estamos aqui para mais informações.',
      error:
        'Tivemos um problema ao tentar cancelar o pagamento. Por favor, tente novamente.',
    },
    update: {
      success:
        'Detalhes do pagamento atualizados. Continue acompanhando seu painel para mais informações.',
      error:
        'Atualização não realizada. Verifique os dados fornecidos e tente novamente.',
    },
    completed: {
      success:
        'Pagamento concluído com sucesso. Agradecemos por cumprir com seus compromissos!',
      error:
        'Parece que houve um problema ao concluir o pagamento. Pode nos dar outra chance?',
    },
    updated: {
      success:
        'Pagamento atualizado com sucesso! O status agora reflete as últimas mudanças.',
      error:
        'Ooops! Algo não funcionou na atualização do pagamento. Verifique e tente novamente.',
    },
  },
  authentication: {
    success: 'Olá, que bom ver você! Vamos fazer algo incrível hoje?',
    error:
      'Algo não está certo. Podemos tentar essas credenciais de novo ou você precisa de um reset?',
  },
  company: {
    create: {
      success: 'Nova empresa cadastrada! Bem-vindo ao clube.',
      error:
        'Não foi possível cadastrar a empresa. Será que esquecemos algum dado?',
    },
    delete: {
      success: 'Empresa removida com sucesso. Foi bom enquanto durou!',
      error:
        'Tivemos um problema ao remover a empresa. Vamos tentar novamente?',
    },
    update: {
      success:
        'Dados da empresa atualizados com sucesso. Estamos sempre melhorando!',
      error:
        'Oops! Algo deu errado na atualização. Cheque as informações e tente novamente.',
    },
  },
  vehicle: {
    create: {
      success: 'Veículo adicionado ao inventário. Prepare-se para rodar!',
      error: 'Falha ao adicionar o veículo. Pode tentar de novo?',
    },
    delete: {
      success: 'Veículo removido com sucesso. Esperamos que não faça falta!',
      error:
        'Não conseguimos remover o veículo. Será que ele já saiu para um passeio?',
    },
    update: {
      success: 'Veículo atualizado. Ele está pronto para mais aventuras!',
      error:
        'Houve um erro ao atualizar o veículo. Verifique tudo e tente novamente.',
    },
  },
  driver: {
    create: {
      success: 'Motorista cadastrado! Pronto para pegar no volante?',
      error:
        'Não conseguimos cadastrar o motorista. Será que todos os campos foram preenchidos corretamente?',
    },
    delete: {
      success: 'Motorista desligado. Desejamos boas estradas!',
      error:
        'Algo deu errado ao desligar o motorista. Vamos revisar os procedimentos?',
    },
    update: {
      success:
        'Informações do motorista atualizadas com sucesso. Pronto para a próxima corrida!',
      error:
        'Atualizar os dados do motorista não funcionou desta vez. Cheque e tente de novo.',
    },
  },
}

export default notifications
