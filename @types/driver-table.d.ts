export interface Driver {
  id: string // Identificador único para cada motorista
  nickname: string // Apelido do motorista
  fullName: string // Nome completo do motorista
  dateOfBirth: Date // Data de nascimento do motorista
  driverLicenseNumber: string // Número da CNH (Carteira Nacional de Habilitação) do motorista
  cpf: string // CPF (Cadastro de Pessoas Físicas) do motorista
  hireDate: Date // Data de entrada do motorista na empresa
  contactNumber: string // Número de contato do motorista
  driverPhoto: string // URL ou caminho para a foto do motorista
  profileUpdateDate: Date // Data da última atualização do perfil do motorista
}
