import { Dialog } from "primereact/dialog";
import { Field, Form, Formik } from "formik";
import { InputText } from "primereact/inputtext";
import type { Tracker } from "@/app/api/types";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { createTracker, updateTracker } from "@/app/api/client";
import type { EditTrackerProps, TrackerFormValues } from "../types";
import styles from "./EditTracker.module.scss";
import { object, string } from "yup";
import ErrorText from "@/components/ErrorText";
import dayjs from "dayjs";

export default function EditTracker({
  editingTracker,
  onDialogHide,
  onPauseAll,
}: EditTrackerProps) {
  const toast = useRef<Toast>(null);

  const handleSubmit = async ({ description }: TrackerFormValues) => {
    const idTracker = (editingTracker as Tracker)?.idTracker;
    if (idTracker) {
      await updateTracker({ idTracker, description });
    } else {
      await onPauseAll?.();

      await createTracker({
        description,
        lastPlayedAt: dayjs().toISOString(),
      });
    }

    toast.current?.show({
      severity: "success",
      summary: `Tracker ${idTracker ? "updated" : "created"}`,
      life: 2000,
    });

    onDialogHide();
  };

  const validationSchema = object().shape({
    description: string().required("This field is required"),
  });

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className={styles.root}
        dismissableMask
        header={
          (editingTracker as Tracker)?.idTracker
            ? "Edit tracker"
            : "New tracker"
        }
        visible={!!editingTracker}
        onHide={onDialogHide}
      >
        <Formik
          initialValues={{
            description: editingTracker?.description ?? "",
          }}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors }) => (
            <Form className={styles.form}>
              <Field
                as={InputText}
                name="description"
                type="text"
                placeholder="Description"
              />
              <ErrorText text={errors.description} />

              <Button
                type="submit"
                label="Save"
                disabled={isSubmitting}
                className={styles.submitButton}
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
