import type { BlockV6 } from "@typebot.io/blocks-core/schemas/schema";
import type { Credentials } from "@typebot.io/credentials/schemas";
import { forgedBlocks } from "@typebot.io/forge-repository/definitions";
import { Field } from "@typebot.io/ui/components/Field";
import { MoreInfoTooltip } from "@typebot.io/ui/components/MoreInfoTooltip";
import { defaultGroupTitleGenPrompt } from "@typebot.io/user/constants";
import type { GroupTitlesAutoGeneration } from "@typebot.io/user/schemas";
import { useTranslate } from "@tolgee/react";
import { useState } from "react";
import { BasicAutocompleteInput } from "@/components/inputs/BasicAutocompleteInput";
import { BasicSelect } from "@/components/inputs/BasicSelect";
import { DebouncedTextarea } from "@/components/inputs/DebouncedTextarea";
import { CredentialsCreateDialog } from "@/features/credentials/components/CredentialsCreateDialog";
import { CredentialsDropdown } from "@/features/credentials/components/CredentialsDropdown";
import { BlockIcon } from "@/features/editor/components/BlockIcon";
import { BlockLabel } from "@/features/editor/components/BlockLabel";
import { ForgeSelectInput } from "@/features/forge/components/ForgeSelectInput";
import { useForgedBlock } from "@/features/forge/hooks/useForgedBlock";

type Props = {
  userId: string;
  values: GroupTitlesAutoGeneration;
  onChange: (value: GroupTitlesAutoGeneration) => void;
};
export const GroupTitlesAutoGenForm = ({
  userId,
  values: { credentialsId, provider, prompt, model },
  onChange,
}: Props) => {
  const { t } = useTranslate();
  const [isCredsDialogOpen, setIsCredsDialogOpen] = useState(false);
  const { blockDef, actionDef } = useForgedBlock({
    nodeType: provider as BlockV6["type"],
    feature: "aiGenerate",
  });
  const [credsCreatingType, setCredsCreatingType] = useState<typeof provider>();

  const updateProvider = (
    provider: GroupTitlesAutoGeneration["provider"] | undefined,
  ) => {
    onChange({
      provider,
    });
  };

  const updateCredentialsId = (credentialsId?: string) => {
    onChange({
      credentialsId,
    });
    setIsCredsDialogOpen(false);
    setCredsCreatingType(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Field.Root className="flex-row items-center">
            <Field.Label>
              {t("account.preferences.groupTitlesAutoGeneration.provider.label")}
            </Field.Label>
            <BasicSelect
              placeholder={t("select")}
              items={Object.values(forgedBlocks)
                .filter((block) => block.actions.some((a) => a.aiGenerate))
                .map((block) => ({
                  value: block.id as GroupTitlesAutoGeneration["provider"],
                  label: (
                    <div className="flex items-center gap-2">
                      <BlockIcon type={block.id} className="size-4" />
                      <BlockLabel type={block.id} />
                    </div>
                  ),
                }))}
              value={provider as GroupTitlesAutoGeneration["provider"]}
              onChange={updateProvider}
            />
          </Field.Root>
        </div>
        {provider && (
          <CredentialsDropdown
            scope={{ type: "user", userId }}
            type={provider as Credentials["type"]}
            currentCredentialsId={credentialsId}
            onCredentialsSelect={updateCredentialsId}
            onCreateNewClick={() => {
              setCredsCreatingType(provider);
              setIsCredsDialogOpen(true);
            }}
            credentialsName="account"
          />
        )}
        {blockDef && credentialsId && actionDef?.aiGenerate && (
          <div className="flex items-center gap-0">
            {actionDef.aiGenerate.models.type === "dynamic" ? (
              <ForgeSelectInput
                defaultValue={model}
                blockDef={blockDef}
                credentialsScope="user"
                fetcherId={actionDef.aiGenerate.models.fetcherId}
                options={{
                  credentialsId,
                }}
                onChange={(value) => {
                  onChange({
                    model: value,
                  });
                }}
              />
            ) : (
              <BasicAutocompleteInput
                items={actionDef.aiGenerate.models.items}
                defaultValue={model}
                onChange={(value) => {
                  onChange({
                    model: value,
                  });
                }}
              />
            )}
            <MoreInfoTooltip>
              {t("account.preferences.groupTitlesAutoGeneration.modelTooltip")}
            </MoreInfoTooltip>
          </div>
        )}
      </div>
      <Field.Root>
        <Field.Label>
          {t("account.preferences.groupTitlesAutoGeneration.prompt.label")}
        </Field.Label>
        <Field.Control
          render={(props) => (
            <DebouncedTextarea
              {...props}
              defaultValue={prompt ?? defaultGroupTitleGenPrompt}
              onValueChange={(value) => {
                onChange({
                  prompt: value,
                });
              }}
            />
          )}
        />
      </Field.Root>
      <CredentialsCreateDialog
        type={credsCreatingType as Credentials["type"]}
        scope="user"
        isOpen={isCredsDialogOpen}
        onClose={() => {
          setIsCredsDialogOpen(false);
        }}
        onSubmit={updateCredentialsId}
      />
    </div>
  );
};
