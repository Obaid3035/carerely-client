import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Avatar from '../../../assets/img/avatar.jpg';
import { BsFillFileEarmarkMinusFill } from 'react-icons/bs';
import './QueriesModal.scss';
import { createAnswers, getAnswers } from '../../../services/api/queries';
import { IQueries } from '../Queries';
import Loader from '../../../component/Loader/Loader';
import { AiFillPlusSquare } from 'react-icons/ai';

interface IQueriesModal {
   show: boolean;
   onClose: () => void;
   query: IQueries;
   queries: IQueries[];
   setQuery: React.Dispatch<React.SetStateAction<any>>;
   setQueries: React.Dispatch<React.SetStateAction<any>>;
}

const QueriesModal: React.FC<IQueriesModal> = ({
   show,
   onClose,
   query,
   setQuery,
   setQueries,
   queries,
}) => {
   const [answer, setAnswer] = useState<IQueries[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [answerInput, setAnswerInput] = useState('');

   useEffect(() => {
      setIsLoading(true);
      getAnswers(query.id).then((res) => {
         setAnswer(res.data);
         setIsLoading(false);
      });
   }, []);

   const onFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      createAnswers(query.id, answerInput).then((res) => {
         const answerClone = answer.concat();
         answerClone.push({
            ...res.data,
         });
         setAnswer(answerClone);
         setQuery({
            ...query,
            answerCount: query.answerCount + 1,
         });
         const queriesClone = queries.concat();
         const foundIndex = queriesClone.findIndex(
            (queries) => queries.id === query.id
         );
         if (foundIndex) {
            queriesClone[foundIndex].answerCount =
               queriesClone[foundIndex].answerCount + 1;
         }
         setQueries(queriesClone);

         setIsLoading(false);
         setAnswerInput('');
      });
   };

   return (
      <Modal show={show} size="lg" className={'query_modal'}>
         <Modal.Body>
            <div className="modal_main">
               <h2> Answers </h2>
               <p onClick={onClose} title="Close">
                  X
               </p>
            </div>
            <hr />

            <div className={'answer_modal'}>
               <img src={Avatar} alt="Avatar" />
               <p>
                  Posted By: <span> {query.user.user_name} </span>
               </p>
            </div>
            <div className={'modal_question mt-3'}>
               <p>{query.text}</p>
               <div className={'answer_count'}>
                  <BsFillFileEarmarkMinusFill />
                  <p>{query.answerCount}</p>
               </div>
            </div>
            {!isLoading ? (
               <React.Fragment>
                  <div>
                     <Form onSubmit={onFormSubmit}>
                        <Form.Group className={'form_answer'}>
                           <Form.Control
                              className="give_answer"
                              value={answerInput}
                              onChange={(e) => setAnswerInput(e.target.value)}
                              type="text"
                              placeholder="Write your Comment"
                           />
                           <button type={'submit'}>
                              <AiFillPlusSquare />
                           </button>
                        </Form.Group>
                     </Form>
                  </div>

                  <div className={'show_all_answers'}>
                     <Container fluid className={'show_all_answers_container'}>
                        <Row className={'align-items-center'}>
                           {answer.map((answer) => (
                              <React.Fragment key={answer.id}>
                                 <Col md={1} className={'show_all_answers_img'}>
                                    <img
                                       src={
                                          answer.user.image
                                             ? answer.user.image.avatar
                                             : Avatar
                                       }
                                       alt={'i'}
                                    />
                                 </Col>
                                 <Col
                                    md={11}
                                    className={'show_all_answers_text'}
                                 >
                                    <h5>
                                       {answer.user.user_name}{' '}
                                       <span> 5 Days ago</span>
                                    </h5>
                                    <p>{answer.text}</p>
                                 </Col>
                                 <hr />
                              </React.Fragment>
                           ))}
                        </Row>
                     </Container>
                  </div>
               </React.Fragment>
            ) : (
               <div className={'text-center'}>
                  <Loader />
               </div>
            )}
         </Modal.Body>
      </Modal>
   );
};

export default QueriesModal;
