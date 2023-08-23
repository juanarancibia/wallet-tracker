"use client";

import { WalletSchema } from "@/models/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useRecoilState } from "recoil";
import { walletsState } from "@/states/wallets.atom";

// TODO: Fix any type
const CustomFormField: FC<{
  field: ControllerRenderProps<z.infer<typeof WalletSchema>, any>;
  label: string;
  placeholder: string;
  description: string;
}> = ({ field, label, placeholder, description }) => (
  <FormItem className="my-2">
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input placeholder={placeholder} {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
);

const WalletForm: FC<{}> = () => {
  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      alias: "",
      network: "",
      address: "",
    },
  });

  const [walletsStateValue, setWalletsState] = useRecoilState(walletsState);

  const onSubmit = (values: z.infer<typeof WalletSchema>) => {
    setWalletsState((current) => [...current, values]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Alias"
              placeholder="My Wallet"
              description="Alias to the wallet"
            />
          )}
        />

        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Network"
              placeholder="Polygon"
              description="Network of the wallet"
            />
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Address"
              placeholder="0x..."
              description="Address of the wallet"
            />
          )}
        />

        <Button className="w-full mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default WalletForm;
