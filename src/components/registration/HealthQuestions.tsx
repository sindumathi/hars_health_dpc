"use client";
import { QUESTIONS, RADIO_ANSWERS } from "@/src/data/healthQuestionsData";
import { ReactFormApi } from "@tanstack/react-form";
import RadioButton from "../uiComponents/RadioButton";
import TextBox from "../uiComponents/TextBox";
import { AnyFieldApi } from "@tanstack/react-form";
import TextArea from "../uiComponents/TextArea";
import { HealthQuestionsState } from "@/src/features/types/patientRegistrationState.type";
import WellnessSlider from "./WellnessSlider";
import CheckBox from "../uiComponents/CheckBox";
const HEALTH_OPTIONS = [
  "Regular exercise (3+ times per week)",
  "Good sleep (Mostly)",
  "On special diets",
  "Good social life",
];
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
type HealthFormProps = {
  form: ReactFormApi<HealthQuestionsState>;
};

const RADIO = "radio";
const TEXT = "text";

export default function HealthQuestions({ form }: HealthFormProps) {
  const { Field } = form;
  return (
    <div className="m-3">
      <div className="sub-header-text font-bold "> Health Questions </div>
      <div className="text-xs text-gray-500">
        ** Answer the quesitons as accurately as possible.
      </div>
      <div className="m-2 p-3">
        <Field name="healthQuestions.questions" mode="array">
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
                <Field name={`healthQuestions.questions[${index}].answerId`}>
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

        <Field name="healthQuestions.selfRating" defaultValue={null}>
          {(field: AnyFieldApi) => (
            <>
              <div className="text-md ">{" Rate your overall health?"}</div>
              <div className="border border-gray-300 rounded-lg shadow-md m-2 p-3">
                <div className="flex p-3 gap-5 items-center ml-5">
                  <h2>Poor</h2>
                  <WellnessSlider field={field} />
                  <h2>Excellent</h2>
                </div>
              </div>
            </>
          )}
        </Field>
        <Field name="healthQuestions.healthChoices">
          {(field) => (
            <>
              <div className="text-md mt-3 mb-3">
                Which of the following that apply to you?
              </div>
              {HEALTH_OPTIONS.map((option, index) => (
                <div key={`check${index}`} className="p-1 ml-2">
                  <CheckBox id={`${option}`} label={option} field={field} />
                </div>
              ))}
            </>
          )}
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
