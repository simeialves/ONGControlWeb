Variáveis de ambiente
Aqui estão as variáveis presentes no arquivo .env:

SECRET_KEY
A chave secreta é usada para criptografar e descriptografar informações sensíveis, como senhas e tokens. Certifique-se de manter essa chave em segurança e não compartilhá-la publicamente.

SALT_BCRIPT
O valor numérico que define o número de iterações do algoritmo de criptografia bcrypt. Isso afeta a força e o tempo de cálculo necessário para o processo de hash. Recomenda-se ajustar esse valor com base nas necessidades de segurança e desempenho do seu projeto.

DB_HOST
O endereço do host onde o banco de dados está localizado.

DB_USER
O nome de usuário usado para autenticar-se no banco de dados.

DB_PASS
A senha associada ao usuário do banco de dados.

DB_NAME
O nome do banco de dados que será utilizado pelo projeto.

DB_PORT
O número da porta utilizada para a conexão com o banco de dados.

PORT
O número da porta em que o servidor será executado.

Observações
Certifique-se de preencher corretamente todas as variáveis de ambiente no arquivo .env antes de executar o projeto. Verifique se as configurações estão de acordo com o ambiente em que você está executando o projeto, seja em desenvolvimento, teste ou produção.
