import RoundBtn from "@/components/RoundBtn";
import * as DropdownMenu from "zeego/dropdown-menu";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundBtn icon={"ellipsis-horizontal"} text={"More"} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Invite friends</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "list.bullet.rectangle.fill",
              pointSize: 24,
            }}
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>App Download</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "coloncurrencysign.arrow.circlepath",
              pointSize: 24,
            }}
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="background">
          <DropdownMenu.ItemTitle>Bind Bank Card</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "photo.fill",
              pointSize: 24,
            }}
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="security">
          <DropdownMenu.ItemTitle>Security</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "plus.rectangle.on.folder.fill",
              pointSize: 24,
            }}
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="verification">
          <DropdownMenu.ItemTitle>Verification</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "plus.rectangle.on.folder.fill",
              pointSize: 24,
            }}
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default Dropdown;
