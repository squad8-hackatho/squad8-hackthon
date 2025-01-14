import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { screenSizes } from '../../themes/theme';
import { useNavigate } from 'react-router-dom';
import { ButtonBig } from '../../components/Button/styles';
import { fetchUser, setRequest } from '../../redux/userSlice';
import { request } from '../../services/services';
import {
  Article,
  H2,
  Info,
  Input,
  Textarea,
  ResquestButton,
  CheckBox,
  StyledModal,
  Contact,
  P,
  Form,
} from './styles';

type props = {
  dataArr: any;
};

function Request({ dataArr }: props) {
  const [subject, setSubject] = useState('');
  const [keyConcepts, setKeyConcepts] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [telefone, setTelefone] = useState({
    contact: '',
    type: '',
  });
  const [email, setEmail] = useState({
    contact: '',
    type: '',
  });
  const element = document.getElementById('urgency') as HTMLInputElement;
  const form = document.getElementById('formRequest') as HTMLFormElement;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => {
    return state;
  });
  const navigate = useNavigate();

  const reset = () => {
    setSubject('');
    setKeyConcepts('');
    setMessage('');
    form.reset();
  };

  useEffect(() => {
    const disableRequest = async () => {
      await dispatch(setRequest(false));
    };
    disableRequest();
  }, []);

  const reload = async () => {
    const obj = {
      profileEmail: currentUser.user.email,
      authentication: currentUser.authorization,
    };
    await dispatch(fetchUser(obj));
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async () => {
    const isChecked = element.checked;

    const contactList = [];

    if (telefone.contact !== '') {
      contactList.push(telefone);
    }
    if (email.contact !== '') {
      contactList.push(email);
    }

    const obj = {
      requiredUserName: dataArr.userName,
      requiredUserEmail: dataArr.email,
      userName: currentUser.user.userName,
      userEmail: currentUser.user.email,
      subject,
      keyWords: keyConcepts,
      urgency: isChecked,
      message,
      contactList,
    };

    const flag = await request(obj, currentUser.authorization);
    if (flag) {
      toggleModal();
      reset();
      reload();
    }
  };

  const modal = () => {
    return (
      <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal}>
        <article>
          <h3>Confirmação</h3>
        </article>
        <P>Requisição enviada para {dataArr.userName}! </P>
        <ButtonBig
          onClick={() => {
            toggleModal();
            navigate('/schedule');
          }}
        >
          Ok
        </ButtonBig>
      </StyledModal>
    );
  };

  const checkValues = () => {
    return subject === '' || email.contact === '';
  };

  // console.log(currentUser);
  return (
    <Form
      id="formRequest"
      onSubmit={(e) => {
        e.preventDefault();
        return onSubmit();
      }}
    >
      <Article>
        {modal()}
        <Info>
          <H2>Assunto*</H2>
          <Input
            placeholder="Digite o assunto da sua requisição"
            onChange={(e) => {
              return setSubject(e.target.value);
            }}
          />
        </Info>
        <Info>
          <H2>Conceitos Chaves</H2>
          <Input
            placeholder="Ex: React, Node"
            onChange={(e) => {
              return setKeyConcepts(e.target.value);
            }}
          />
        </Info>
        <Info>
          <CheckBox id="urgency" type="checkbox" />
          <P>Apresentar solicitação com urgência.</P>
        </Info>
        <Info>
          <H2>Mensagem</H2>
          <Textarea
            placeholder="Digite uma mensagem para o mentor"
            onChange={(e) => {
              return setMessage(e.target.value);
            }}
          />
        </Info>

        <Contact>
          <Info>
            <H2>Telefone</H2>
            <Input
              placeholder="(xx) xxxxx-xxxx"
              onChange={(e) => {
                return setTelefone({
                  contact: e.target.value,
                  type: 'telefone',
                });
              }}
            />
          </Info>
          <Info>
            <H2>Email*</H2>
            <Input
              placeholder="Digite seu e-mail"
              onChange={(e) => {
                return setEmail({
                  contact: e.target.value,
                  type: 'email',
                });
              }}
            />
          </Info>
        </Contact>

        <ResquestButton>
          <ButtonBig disabled={checkValues()}>Enviar</ButtonBig>
        </ResquestButton>
      </Article>
    </Form>
  );
}

export default Request;
