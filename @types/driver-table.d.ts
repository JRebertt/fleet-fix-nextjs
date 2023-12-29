export interface Driver {
  nickname: string // Apelido do motorista
  fullName: string // Nome completo do motorista
  dateOfBirth: string // Data de nascimento do motorista
  driverLicenseNumber: string // Número da CNH (Carteira Nacional de Habilitação) do motorista
  cpf: string // CPF (Cadastro de Pessoas Físicas) do motorista
  hireDate: string // Data de entrada do motorista na empresa
  contactNumber: string // Número de contato do motorista
  driverPhoto?: string // URL ou caminho para a foto do motorista
  company: string // Company do motorista
  createdAt: string // Data da última criação do perfil do motorista
  updatedAt: string // Data da última atualização do perfil do motorista
}
