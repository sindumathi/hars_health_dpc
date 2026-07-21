"use client";
import { QUESTIONS, RADIO_ANSWERS } from "@/src/data/healthQuestionsData";
import RadioButton from "../uiComponents/RadioButton";
import TextBox from "../uiComponents/TextBox";
import { AnyFieldApi } from "@tanstack/react-form";
import TextArea from "../uiComponents/TextArea";
// export interface QuestionsState {
//   questionId: number;
//   type: "radio" | "text";
//   answerId?: string;
//   answerText?: string;
// }

// export interface DailyChoiceState {
//   id: number;
//   choiceName: string;
// }

// export interface HealthQuestionsState {
//   questions: QuestionsState[];
//   selfRating: number;
//   healthChoices: DailyChoiceState[];
// }
const DEFAULT_HEALTH_QUESTIONS = {
  questions: [],
  selfRating: 0,
  healthChoices: [],
};
const RADIO = "radio";
const TEXT = "text";
export default function HealthQuestions({ form }) {
  const { Field } = form;
  return (
    <div className="m-3">
      <div className="sub-header-text font-bold "> Health Questions </div>
      <div className="text-xs text-gray-500">
        ** Answer the quesitons as accurately as possible.
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md m-2 p-3">
        <Field
          name="questions"
          mode="array"
          defaultValue={DEFAULT_HEALTH_QUESTIONS}
        >
          {(field: AnyFieldApi) =>
            QUESTIONS.map((qObject, index) => (
              <div key={index}>
                <Field
                  name={`questions[${index}].type`}
                  defaultValue={qObject.type}
                ></Field>
                <Field
                  name={`questions[${index}].questionId`}
                  key={`question_${index}`}
                  defaultValue={qObject.id}
                >
                  <div className="p-1">{qObject.question}</div>
                </Field>
                <Field name={`questions[${index}].answerId`}>
                  {(subField: AnyFieldApi) =>
                    qObject.type === RADIO ? (
                      RADIO_ANSWERS.map((option, index) => (
                        <div key={`radio_${index}`} className="p-1 px-4">
                          <RadioButton option={option} field={subField} />
                        </div>
                      ))
                    ) : (
                      <div className="w-4/5 px-3 py-1.5">
                        <TextArea variant="primary" textAreaField={subField} />
                      </div>
                    )
                  }
                </Field>
              </div>
            ))
          }
        </Field>
      </div>
    </div>
  );
}

// return QUESTIONS.map((qObject, index) => (
//               <>
//                 <Field
//                   name={`questions[${index}].type`}
//                   defaultValue={qObject.type}
//                 ></Field>
//                 <Field
//                   name={`questions[${index}].questionId`}
//                   key={`question_${index}`}
//                   defaultValue={qObject.id}
//                 >
//                   <div className="p-1">{qObject.question}</div>
//                 </Field>
//                 <Field name={`questions[${index}].answerId`}>
//                   {(subField: AnyFieldApi) =>
//                     qObject.type === RADIO ? (
//                       RADIO_ANSWERS.map((option, index) => (
//                         <div key={`radio_${index}`}>
//                           <RadioButton option={option} field={subField} />{" "}
//                         </div>
//                       ))
//                     ) : (
//                       <div>
//                         <TextBox
//                           variant="primary"
//                           value={subField.state.value}
//                           onChange={subField.handleChange}
//                         />
//                       </div>
//                     )
//                   }
//                 </Field>
//                 <Field name={`questions[${index}].answerText`}></Field>
//               </>
//             ));
//           }
