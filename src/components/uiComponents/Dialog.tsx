import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type DialogWindowPropType = {
  title?: string;
  open: boolean;
  handleSave: () => void;
  onOpenClose: (open: boolean) => void;
  children: React.ReactNode;
};

export default function DialogWindow(props: DialogWindowPropType) {
  const { children, title, open, handleSave, onOpenClose } = props;
  return (
    <Dialog open={open}>
      <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
      {/* w-[95vw] max-w-md md:max-w-2xl lg:max-w-4xl*/}
      <DialogContent className="flex max-h-[calc(100dvh-48px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm  md:max-w-3xl lg:max-w-5xl ">
        <ScrollArea className="flex-1 overflow-y-auto">
          <DialogHeader className="bg-sky-800 text-white font-semibold text-xl rounded-md p-3">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {children}
        </ScrollArea>
        <DialogFooter className="bg-gray-100 p-2 mr-2">
          <DialogClose
            onClick={() => onOpenClose(false)}
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
